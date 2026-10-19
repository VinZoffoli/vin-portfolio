"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion";
import { EXPERIENCE, tr, type Locale } from "@/lib/content";
import { LogoTile } from "../ui/Logo";
import { ArrowUpRight } from "../ui/Icons";

/** "2025 — Hoy", "2023" o "Freelance": rango de años a partir de los periodos. */
function yearsOf(job: (typeof EXPERIENCE.jobs)[number], locale: Locale) {
  const ys = job.roles.flatMap((r) => r.period.es.match(/\d{4}/g) ?? []).map(Number);
  if (!ys.length) return job.roles[0].title.es.includes("freelance") ? "Freelance" : "";
  const start = Math.min(...ys);
  const end = job.current ? (locale === "es" ? "Hoy" : "Now") : Math.max(...ys);
  return start === end ? String(start) : `${start} — ${end}`;
}

/**
 * Escena fijada (patrón de galería de estate): a la izquierda la lista de
 * empresas con contador; a la derecha cada empresa entra con un barrido de
 * abajo hacia arriba mientras la anterior se aleja.
 */
export function Experience({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const jobs = EXPERIENCE.jobs;
  const total = jobs.length;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (min-height: 620px)", () => {
        const section = root.current!;
        const q = gsap.utils.selector(section);
        const scene = q(".exp__scene")[0] as HTMLElement;
        const cards = q(".exp-card") as HTMLElement[];
        const items = q(".exp__item") as HTMLElement[];
        const counter = q("[data-exp-count]")[0] as HTMLElement;
        const bar = q(".exp__progress > span")[0] as HTMLElement;
        section.classList.add("is-pinned");

        let current = -1;
        const setActive = (i: number) => {
          if (i === current) return;
          current = i;
          items.forEach((el, j) => el.classList.toggle("is-active", j === i));
          counter.textContent = String(i + 1).padStart(2, "0");
        };
        setActive(0);

        gsap.set(cards.slice(1), { clipPath: "inset(100% 0% 0% 0% round 1.75rem)" });
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: scene,
            start: "top top",
            end: () => `+=${window.innerHeight * (total - 1) * 0.95}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              gsap.set(bar, { scaleX: self.progress });
              setActive(Math.min(total - 1, Math.round(self.progress * (total - 1))));
            },
          },
        });

        cards.slice(1).forEach((card, k) => {
          const prev = cards[k];
          tl.fromTo(
            prev,
            { scale: 1, yPercent: 0, filter: "brightness(1)" },
            { scale: 0.9, yPercent: -5, filter: "brightness(0.9)", duration: 1, ease: "power1.inOut" },
            k,
          )
            .fromTo(card, { clipPath: "inset(100% 0% 0% 0% round 1.75rem)" }, { clipPath: "inset(0% 0% 0% 0% round 1.75rem)", duration: 1, ease: "power2.inOut" }, k)
            .fromTo(card.querySelector(".exp-card__mark"), { yPercent: 30, rotate: -8 }, { yPercent: 0, rotate: 0, duration: 1, ease: "power2.out" }, k)
            .fromTo(card.querySelectorAll("[data-exp-in]"), { y: 36, opacity: 0.001 }, { y: 0, opacity: 1, duration: 0.55, stagger: 0.05, ease: "power2.out" }, k + 0.4);
        });
        tl.to({}, { duration: 0.25 });

        // La lista también navega: lleva a la empresa dentro de la escena
        const onClick = (e: Event) => {
          const i = Number((e.currentTarget as HTMLElement).dataset.index);
          const st = tl.scrollTrigger!;
          const y = st.start + ((st.end - st.start) * i) / tl.duration();
          if (window.__lenis) window.__lenis.scrollTo(y, { duration: 1.4 });
          else window.scrollTo({ top: y, behavior: "smooth" });
        };
        items.forEach((el) => el.addEventListener("click", onClick));

        return () => {
          items.forEach((el) => el.removeEventListener("click", onClick));
          section.classList.remove("is-pinned");
        };
      });

      // Móvil: cada tarjeta sube al entrar
      mm.add("(max-width: 1023px), (max-height: 619px)", () => {
        (gsap.utils.toArray<HTMLElement>(".exp-card", root.current)).forEach((card) => {
          gsap.from(card, { y: 50, opacity: 0.001, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: card, start: "top 88%", once: true } });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="experiencia" className="exp surface-paper relative">
      <div className="exp__scene">
        <div className="container-x exp__grid">
          <div className="exp__side">
            <p className="eyebrow text-muted" data-reveal>
              {tr(EXPERIENCE.eyebrow, locale)}
            </p>
            <h2 className="t-h2 t-h2--side mt-4 text-ink" data-paint>
              {tr(EXPERIENCE.title, locale)}
            </h2>

            <ol className="exp__list" aria-hidden>
              {jobs.map((job, i) => (
                <li key={job.company}>
                  <button type="button" tabIndex={-1} data-index={i} className={`exp__item ${i === 0 ? "is-active" : ""}`}>
                    <LogoTile src={job.logo} name={job.company} size="xs" />
                    <span className="exp__item-name">{job.company}</span>
                    <span className="exp__item-period">{tr(job.roles[job.roles.length - 1].period, locale).split(" — ")[0]}</span>
                  </button>
                </li>
              ))}
            </ol>

            <div className="exp__counter" aria-hidden>
              <p className="t-display">
                <span data-exp-count className="text-brand">
                  01
                </span>
                <span className="text-subtle"> / {String(total).padStart(2, "0")}</span>
              </p>
              <div className="exp__progress">
                <span />
              </div>
            </div>
          </div>

          <ol className="exp__stage">
            {jobs.map((job, i) => (
              <li key={job.company} className="exp-card" style={{ zIndex: i + 1 }}>
                <span className="exp-card__mark" aria-hidden>
                  <LogoTile src={job.logo} name={job.company} />
                </span>
                <header className="exp-card__head" data-exp-in>
                  <div className="flex items-center gap-4">
                    <LogoTile src={job.logo} name={job.company} />
                    <div>
                      <h3 className="t-h3 text-ink">
                        {job.url ? (
                          <a href={job.url} target="_blank" rel="noopener noreferrer" className="u-link">
                            {job.company}
                            <ArrowUpRight className="size-4 text-brand" />
                          </a>
                        ) : (
                          job.company
                        )}
                      </h3>
                      <p className="mt-0.5 text-sm text-muted">{tr(job.meta, locale)}</p>
                    </div>
                  </div>
                  {job.current && <span className="exp-card__badge">{locale === "es" ? "Actual" : "Current"}</span>}
                </header>

                <div className="exp-card__roles">
                  {job.roles.map((role) => (
                    <div key={role.title.es} className="exp-card__role" data-exp-in>
                      <div>
                        <p className="font-heading text-ink">{tr(role.title, locale)}</p>
                        <p className="mt-1 text-sm text-subtle">{tr(role.period, locale)}</p>
                      </div>
                      <ul>
                        {role.bullets.map((b) => (
                          <li key={b.es}>{tr(b, locale)}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="exp-card__foot" data-exp-in>
                  <ul className="exp-card__tags">
                    {job.tags.map((t) => (
                      <li key={t} className="chip">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <span className="exp-card__years t-display" aria-hidden>
                    {yearsOf(job, locale)}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="container-x exp__earlier">
        <h3 className="eyebrow text-muted" data-reveal>
          {tr(EXPERIENCE.earlierTitle, locale)}
        </h3>
        <p className="mt-3 max-w-[60ch] text-muted" data-reveal>
          {locale === "es"
            ? "Logística, cobranzas y acompañamiento terapéutico: años de trato directo con personas que hoy se notan en cómo escucho a cada cliente."
            : "Logistics, collections and therapeutic support: years of dealing directly with people that show today in how I listen to every client."}
        </p>
        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {EXPERIENCE.earlier.map((e) => (
            <li key={e.company + e.role.es} className="flex items-center gap-4 rounded-2xl border border-paper-3 bg-paper-2/70 p-4" data-reveal>
              <LogoTile src={e.logo} name={e.company} size="sm" />
              <div className="min-w-0">
                <p className="font-heading text-[0.95rem] text-ink">{tr(e.role, locale)}</p>
                <p className="truncate text-sm text-muted">{e.company}</p>
                <p className="text-xs text-subtle">{tr(e.period, locale)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
