"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/motion";
import { RESTO, tr, type Locale, type Project } from "@/lib/content";
import { ArrowUpRight } from "../ui/Icons";
import { LogoTile } from "../ui/Logo";

const host = (url: string) => new URL(url).hostname.replace(/^www\./, "");

/** Ventana de navegador con la captura de escritorio + teléfono con la versión móvil. */
function DeviceMockup({ project, locale }: { project: Project; locale: Locale }) {
  return (
    <div className="mock">
      <div className="mock__browser">
        <div className="mock__bar" aria-hidden>
          <span className="mock__dots">
            <i />
            <i />
            <i />
          </span>
          <span className="mock__url">
            <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
            {host(project.url)}
          </span>
          <span className="w-10" />
        </div>
        <div className="mock__screen">
          <img src={project.image} alt={`${project.name} — ${tr(project.kind, locale)}, versión escritorio`} width={1440} height={900} loading="lazy" decoding="async" />
        </div>
      </div>
      {project.mobile && (
        <div className="mock__phone">
          <div className="mock__phone-screen">
            <img src={project.mobile} alt={`${project.name}, versión móvil`} width={520} height={1126} loading="lazy" decoding="async" />
          </div>
        </div>
      )}
    </div>
  );
}

export function RestoWork({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const total = RESTO.projects.length;
  const visit = locale === "es" ? "Visitar" : "Visit";

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (min-height: 560px)", () => {
        const section = root.current!;
        const q = gsap.utils.selector(section);
        const track = q(".hscroll__track")[0] as HTMLElement;
        const viewport = q(".hscroll__viewport")[0] as HTMLElement;
        const counter = q("[data-counter]")[0] as HTMLElement;
        const bar = q(".hprogress > span")[0] as HTMLElement;
        section.classList.add("is-pinned");

        // El ancho de cada tarjeta sale del alto realmente disponible: así el
        // mockup y su pie siempre caben, sea cual sea la pantalla.
        const BAR = 36;
        const size = () => {
          const caption = section.querySelector<HTMLElement>("[data-caption]");
          const capH = caption ? caption.offsetHeight + parseFloat(getComputedStyle(caption).marginTop) : 90;
          const w = Math.min(window.innerWidth * 0.58, Math.max(300, (viewport.clientHeight - capH - BAR) * 1.6));
          section.style.setProperty("--card-w", `${Math.floor(w)}px`);
        };
        size();
        ScrollTrigger.addEventListener("refreshInit", size);

        // Recorrido justo para que la última tarjeta termine en el borde derecho del header
        const distance = () => {
          const cs = getComputedStyle(viewport);
          const inner = viewport.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
          return Math.max(0, track.scrollWidth - inner);
        };
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance() * 1.1}`,
            pin: true,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              gsap.set(bar, { scaleX: self.progress });
              counter.textContent = String(Math.min(total, Math.floor(self.progress * total) + 1)).padStart(2, "0");
            },
          },
        });

        (q(".work-card") as HTMLElement[]).forEach((card) => {
          const browser = card.querySelector(".mock__browser");
          const img = card.querySelector(".mock__screen img");
          const phone = card.querySelector(".mock__phone");
          const caption = card.querySelector("[data-caption]");
          const entrance = gsap
            .timeline({ paused: true })
            .fromTo(browser, { clipPath: "inset(100% 0% 0% 0% round 14px)", y: 50 }, { clipPath: "inset(0% 0% 0% 0% round 14px)", y: 0, duration: 1.3, ease: "expo.inOut" })
            .fromTo(img, { scale: 1.25 }, { scale: 1.06, duration: 1.8, ease: "expo.out" }, 0.1)
            .fromTo(phone, { yPercent: 40, opacity: 0, rotate: 6 }, { yPercent: 0, opacity: 1, rotate: 0, duration: 1.2, ease: "expo.out" }, 0.55)
            .fromTo(caption, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "expo.out" }, 0.5);

          const visibleAtStart = card.offsetLeft < viewport.clientWidth;
          ScrollTrigger.create(
            visibleAtStart
              ? { trigger: section, start: "top 70%", once: true, onEnter: () => entrance.play() }
              : { trigger: card, containerAnimation: tween, start: "left 92%", once: true, onEnter: () => entrance.play() },
          );

          // Parallax interno y el teléfono flotando a otra velocidad
          const st = { trigger: card, containerAnimation: tween, start: "left right", end: "right left", scrub: true };
          gsap.fromTo(img, { xPercent: -2.5 }, { xPercent: 2.5, ease: "none", scrollTrigger: st });
          if (phone) gsap.fromTo(phone, { x: 40 }, { x: -40, ease: "none", scrollTrigger: st });
        });

        return () => {
          ScrollTrigger.removeEventListener("refreshInit", size);
          section.classList.remove("is-pinned");
          section.style.removeProperty("--card-w");
        };
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="proyectos" className="resto sheet surface-dark noise">
      <div className="resto__inner">
        <div className="container-x resto__head">
          <div>
            <p className="eyebrow flex items-center gap-3 text-on-dark-muted" data-reveal>
              <LogoTile src="/logos/resto-experience.svg" name="Resto Experience" size="xs" />
              {tr(RESTO.eyebrow, locale)}
            </p>
            <h2 className="t-h2 resto__title mt-4" data-paint>
              {tr(RESTO.title, locale)}
            </h2>
          </div>
          <div className="resto__aside">
            <p className="text-on-dark-muted" data-reveal>
              {tr(RESTO.lead, locale)}
            </p>
            <div className="mt-6 hidden items-center gap-5 lg:flex" aria-hidden>
              <p className="t-display shrink-0 text-4xl">
                <span data-counter className="text-brand-light">
                  01
                </span>
                <span className="text-on-dark-muted"> / {String(total).padStart(2, "0")}</span>
              </p>
              <div className="hprogress flex-1">
                <span />
              </div>
            </div>
          </div>
        </div>

        <div className="hscroll__viewport">
          <ul className="hscroll__track">
            {RESTO.projects.map((p, i) => (
              <li key={p.slug} className="work-card">
                <a href={p.url} target="_blank" rel="noopener noreferrer" data-cursor={visit} className="group block">
                  <DeviceMockup project={p} locale={locale} />
                  <div data-caption className="mt-7 flex items-start justify-between gap-6 pr-[27%]">
                    <div className="flex items-start gap-4">
                      <span className="t-mono pt-1 text-brand-light">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <h3 className="t-h3">{p.name}</h3>
                        <p className="mt-1 text-sm text-on-dark-muted">
                          {tr(p.kind, locale)} · {p.place}
                        </p>
                      </div>
                    </div>
                    <span className="u-link mt-1 shrink-0 text-sm font-semibold">
                      {visit}
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
