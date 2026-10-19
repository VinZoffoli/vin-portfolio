"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion";
import { ABOUT, PROFILE, tr, type Locale } from "@/lib/content";

/** Sello circular que gira (texto sobre un círculo SVG). */
function Badge({ text }: { text: string }) {
  return (
    <span className="badge" aria-hidden>
      <svg viewBox="0 0 200 200" className="badge__ring">
        <defs>
          <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text>
          <textPath href="#badge-circle" startOffset="0">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="badge__core">VZ</span>
    </span>
  );
}

type Media = "photo" | "code" | "cursor" | "site" | "motion";

/** Pieza visual que vive dentro de la frase, del alto de una letra. */
function InlineMedia({ kind }: { kind: Media }) {
  switch (kind) {
    case "photo":
      return (
        <span className="mtok mpill mpill--photo">
          <img src={PROFILE.photo} alt="" width={120} height={120} />
        </span>
      );
    case "code":
      return (
        <span className="mtok mpill mpill--code">
          <span>
            {"</>"}
            <i className="mpill__caret" />
          </span>
        </span>
      );
    case "cursor":
      return (
        <span className="mtok mpill mpill--cursor">
          <svg viewBox="0 0 24 24" className="mpill__arrow">
            <path d="M5 3l14 7-6 2-2 6z" />
          </svg>
          <i className="mpill__ripple" />
        </span>
      );
    case "site":
      return (
        <span className="mtok mpill mpill--site">
          <img src="/work/resto/showdown.webp" alt="" width={240} height={150} />
        </span>
      );
    case "motion":
      return (
        <span className="mtok mpill mpill--motion">
          <i />
          <i />
          <i />
        </span>
      );
  }
}

export function About({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const tokens = tr(ABOUT.statement, locale).split(" ");
  const plain = tokens.filter((t) => !t.startsWith("{")).join(" ");

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      // Escena 1 · Manifiesto: cada palabra se enciende y cada pieza visual
      // aparece con un rebote justo cuando la lectura llega a ella.
      const build = (scrollTrigger: ScrollTrigger.Vars) => {
        const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger });
        const tokens = q(".statement .mtok") as HTMLElement[];
        const STEP = 0.1;
        tokens.forEach((el, i) => {
          if (el.classList.contains("mpill")) {
            tl.fromTo(el, { scale: 0, rotate: -30 }, { scale: 1, rotate: 0, duration: 0.35, ease: "back.out(2.2)" }, i * STEP);
          } else {
            tl.to(el, { opacity: 1, color: "#2b0a12", duration: STEP * 2 }, i * STEP);
          }
        });
        const end = tokens.length * STEP + 0.3;
        tl.fromTo(q(".manifesto__bg"), { xPercent: 8 }, { xPercent: -38, duration: end }, 0)
          .fromTo(q(".manifesto__progress > span"), { scaleX: 0 }, { scaleX: 1, duration: end }, 0)
          .fromTo(q(".manifesto__mark"), { scale: 0, rotate: -90 }, { scale: 1, rotate: 0, duration: 0.3, ease: "back.out(2)" }, end - 0.3);
      };
      mm.add("(min-width: 768px) and (min-height: 520px)", () =>
        build({ trigger: q(".manifesto")[0], start: "top top", end: "+=160%", pin: true, scrub: 0.8, anticipatePin: 1 }),
      );
      mm.add("(max-width: 767px), (max-height: 519px)", () =>
        build({ trigger: q(".statement")[0], start: "top 80%", end: "bottom 45%", scrub: 0.8 }),
      );

      // Escena 2 · Retrato: persiana + parallax interno
      gsap.fromTo(
        q(".portrait"),
        { clipPath: "inset(100% 0% 0% 0% round 1.75rem)" },
        { clipPath: "inset(0% 0% 0% 0% round 1.75rem)", duration: 1.6, ease: "expo.inOut", scrollTrigger: { trigger: q(".portrait")[0], start: "top 80%", once: true } },
      );
      gsap.fromTo(
        q(".portrait img"),
        { scale: 1.3, yPercent: -6 },
        { scale: 1.08, yPercent: 6, ease: "none", scrollTrigger: { trigger: q(".madeof")[0], start: "top bottom", end: "bottom top", scrub: true } },
      );
      gsap.from(q(".badge"), { scale: 0, rotate: -120, duration: 1.4, ease: "back.out(1.6)", scrollTrigger: { trigger: q(".portrait")[0], start: "top 70%", once: true } });

      // Ingredientes: la palabra sube desde su máscara y la línea se dibuja
      (q(".ingredient") as HTMLElement[]).forEach((row) => {
        gsap
          .timeline({ scrollTrigger: { trigger: row, start: "top 85%", once: true } })
          .fromTo(row.querySelector(".ingredient__line"), { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "expo.inOut" })
          .fromTo(row.querySelector(".ingredient__word > span"), { yPercent: 105 }, { yPercent: 0, duration: 1.1, ease: "expo.out" }, 0.25)
          .fromTo(row.querySelector(".ingredient__text"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out" }, 0.45);
      });

      // Cifras
      (q("[data-count-to]") as HTMLElement[]).forEach((el) => {
        const obj = { v: 0 };
        gsap.to(obj, {
          v: Number(el.dataset.countTo),
          duration: 2.2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="sobre-mi" className="about sheet surface-paper">
      {/* Escena 1 · Manifiesto */}
      <div className="manifesto">
        <span className="manifesto__bg t-display" aria-hidden>
          {tr(ABOUT.manifesto, locale)}
        </span>
        <div className="container-x">
          <p className="eyebrow text-muted">
            {tr(ABOUT.eyebrow, locale)} · {tr(ABOUT.manifesto, locale)}
          </p>
          <p className="statement t-display mt-8" aria-label={plain}>
            {tokens.map((t, i) => {
              const media = t.match(/^\{(\w+)\}$/);
              if (media) return <InlineMedia key={i} kind={media[1] as Media} />;
              return (
                <span key={i} className="word mtok" aria-hidden>
                  {t}{" "}
                </span>
              );
            })}
            <span className="manifesto__mark pixel" aria-hidden />
          </p>
          <div className="manifesto__sign">
            <span className="manifesto__avatar">
              <img src={PROFILE.photo} alt="" width={96} height={96} />
            </span>
            <span>
              <span className="block font-heading text-ink">{PROFILE.name}</span>
              <span className="block text-sm text-muted">{locale === "es" ? "Guápiles, Costa Rica · 2026" : "Guápiles, Costa Rica · 2026"}</span>
            </span>
            <span className="manifesto__progress" aria-hidden>
              <span />
            </span>
          </div>
        </div>
      </div>

      {/* Escena 2 · De qué estoy hecho */}
      <div className="madeof container-x">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <figure className="portrait-wrap">
                <div className="portrait">
                  <img src={PROFILE.photo} alt={PROFILE.name} width={460} height={460} loading="lazy" decoding="async" />
                </div>
                <Badge text={tr(ABOUT.badge, locale)} />
                <figcaption className="mt-5">
                  <span className="t-h3 block text-ink">{PROFILE.name}</span>
                  <span className="mt-1 block text-sm text-muted">{tr(ABOUT.langs, locale)}</span>
                </figcaption>
              </figure>
            </div>
          </div>

          <div className="lg:col-span-7">
            <h2 className="t-h2 t-h2--side text-ink" data-paint>
              {tr(ABOUT.madeOfTitle, locale)}
            </h2>
            <ul className="mt-10">
              {ABOUT.ingredients.map((ing) => (
                <li key={ing.word.es} className="ingredient group">
                  <span className="ingredient__line" aria-hidden />
                  <h3 className="ingredient__word t-display">
                    <span>{tr(ing.word, locale)}</span>
                  </h3>
                  <p className="ingredient__text">{tr(ing.text, locale)}</p>
                </li>
              ))}
            </ul>

            <div className="mt-12 flex flex-col gap-5 text-muted t-lead">
              {ABOUT.body.map((p, i) => (
                <p key={i} data-reveal>
                  {tr(p, locale)}
                </p>
              ))}
            </div>
          </div>
        </div>

        <dl className="stats">
          {ABOUT.stats.map((s) => (
            <div key={s.label.es} className="stats__item" data-reveal>
              <dt className="stats__label">{tr(s.label, locale)}</dt>
              <dd className="stats__num t-display">
                <span data-count-to={s.value}>{s.value}</span>
                <span className="text-brand">{s.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
