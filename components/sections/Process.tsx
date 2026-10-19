"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion";
import { PROCESS, tr, type Locale } from "@/lib/content";

export function Process({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      const list = q("ol")[0] as HTMLElement;
      const steps = q(".step") as HTMLElement[];
      const mid = (steps.length - 1) / 2;
      const mm = gsap.matchMedia();

      // Escritorio: las cartas parten apiladas al centro y se reparten en
      // abanico hasta su lugar (el "deal" de Corazón / estate).
      mm.add("(min-width: 1024px)", () => {
        const toCenter = (el: HTMLElement) => {
          const o = list.getBoundingClientRect();
          const r = el.getBoundingClientRect();
          return o.left + o.width / 2 - (r.left + r.width / 2);
        };
        gsap
          .timeline({ scrollTrigger: { trigger: list, start: "top 88%", end: "top 38%", scrub: 0.8, invalidateOnRefresh: true } })
          .from(
            steps,
            {
              x: (_i: number, el: HTMLElement) => toCenter(el),
              y: (i: number) => 40 + Math.abs(i - mid) * 14,
              rotate: (i: number) => (i - mid) * 7,
              scale: 0.9,
              opacity: 0.001,
              ease: "power2.out",
              stagger: { each: 0.06, from: "center" },
            },
            0,
          )
          .to(q(".process-line > span"), { scaleX: 1, ease: "none" }, 0);
      });

      // Móvil: las cartas suben en cascada
      mm.add("(max-width: 1023px)", () => {
        gsap.from(steps, {
          y: 40,
          opacity: 0.001,
          duration: 1,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: list, start: "top 85%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="sheet surface-paper section-y overflow-hidden">
      <div className="container-x">
        <p className="eyebrow text-muted" data-reveal>
          {tr(PROCESS.eyebrow, locale)}
        </p>
        <h2 className="t-h2 mt-4 max-w-3xl text-ink" data-paint>
          {tr(PROCESS.title, locale)}
        </h2>

        <div className="process-line mt-14 hidden lg:block" aria-hidden>
          <span />
        </div>
        <ol className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-5 lg:gap-5">
          {PROCESS.steps.map((s, i) => (
            <li key={s.name.es} className="step step--card">
              <span className="step__num" aria-hidden>
                0{i + 1}
              </span>
              <h3 className="t-h3 mt-6 text-ink">{tr(s.name, locale)}</h3>
              <p className="mt-2 text-[0.975rem] leading-relaxed text-muted">{tr(s.text, locale)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
