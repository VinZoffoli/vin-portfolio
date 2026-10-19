"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion";
import { STACK, tr, type Locale, type L } from "@/lib/content";
import { TOOL_ICONS, hoverColor } from "@/lib/icons";

type Item = string | L;
const keyOf = (item: Item) => (typeof item === "string" ? item : item.es);
const labelOf = (item: Item, locale: Locale) => (typeof item === "string" ? item : tr(item, locale));

function ToolChip({ item, locale }: { item: Item; locale: Locale }) {
  const icon = TOOL_ICONS[keyOf(item)];
  const style = icon && "path" in icon ? ({ "--tool-c": hoverColor(icon.hex) } as React.CSSProperties) : undefined;
  return (
    <li className="tchip" style={style}>
      {icon && "path" in icon ? (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path d={icon.path} />
        </svg>
      ) : (
        <span className="tchip__glyph" aria-hidden>
          {icon && "glyph" in icon ? icon.glyph : "•"}
        </span>
      )}
      {labelOf(item, locale)}
    </li>
  );
}

/** Hoja de capacidades: todas las áreas visibles, cada una con sus herramientas. */
export function Stack({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const totalTools = STACK.groups.reduce((n, g) => n + g.items.length, 0);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      (gsap.utils.toArray<HTMLElement>(".cap", root.current)).forEach((row) => {
        gsap
          .timeline({ scrollTrigger: { trigger: row, start: "top 85%", once: true } })
          .fromTo(row.querySelector(".cap__line"), { scaleX: 0 }, { scaleX: 1, duration: 1.3, ease: "expo.inOut" })
          .fromTo(row.querySelectorAll(".cap__head > *"), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "expo.out", stagger: 0.08 }, 0.2)
          .fromTo(row.querySelectorAll(".tchip"), { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "expo.out", stagger: 0.025 }, 0.3);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="stack" data-recede className="stack sheet surface-dark noise section-y">
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow text-on-dark-muted" data-reveal>
              {tr(STACK.eyebrow, locale)}
            </p>
            <h2 className="t-h2 t-h2--side mt-4" data-paint>
              {tr(STACK.title, locale)}
            </h2>
            <p className="mt-6 max-w-[40ch] text-on-dark-muted" data-reveal>
              {locale === "es"
                ? "Elijo la herramienta por el proyecto, no por costumbre: código a medida cuando hace falta rendimiento y control, plataformas cuando el cliente necesita autonomía."
                : "I pick the tool for the project, not out of habit: custom code when performance and control matter, platforms when the client needs autonomy."}
            </p>
            <dl className="stack__stats" data-reveal>
              <div>
                <dt>{locale === "es" ? "Herramientas" : "Tools"}</dt>
                <dd className="t-display">{totalTools}</dd>
              </div>
              <div>
                <dt>{locale === "es" ? "Áreas" : "Areas"}</dt>
                <dd className="t-display">{STACK.groups.length}</dd>
              </div>
            </dl>
          </div>
        </div>

        <ul className="lg:col-span-8">
          {STACK.groups.map((g) => (
            <li key={g.name.es} className="cap">
              <span className="cap__line" aria-hidden />
              <div className="cap__head">
                <h3 className="cap__name">{tr(g.name, locale)}</h3>
                <p className="cap__note">{tr(g.note, locale)}</p>
              </div>
              <ul className="cap__tools">
                {g.items.map((item) => (
                  <ToolChip key={keyOf(item)} item={item} locale={locale} />
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
