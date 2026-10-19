"use client";

import { useRef } from "react";
import { gsap, useGSAP, onIntroDone, prefersReducedMotion, scrollToId } from "@/lib/motion";
import { HERO, PROFILE, tr, type Locale } from "@/lib/content";
import { TOOL_ICONS } from "@/lib/icons";
import { Magnetic } from "../ui/Magnetic";
import { ArrowDown, ArrowUpRight } from "../ui/Icons";

const PLATFORMS = ["Next.js", "React", "TypeScript", "WordPress", "Webflow", "Wix", "Framer", "Shopify", "Figma", "GSAP"];
const ROTATOR = ["Next.js", "WordPress", "Webflow", "React", "Wix", "Framer", "Shopify"];

function Chars({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((c, i) => (
        <span key={i} className="ch">
          {c}
        </span>
      ))}
    </>
  );
}

/**
 * Portada tipográfica centrada. El nombre tiene dos "ecos" en contorno que
 * se mueven a distinta profundidad con el puntero; una palabra rota entre
 * las plataformas; al hacer scroll el nombre crece y se desvanece para dar
 * paso al portafolio.
 */
export function Hero({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);

      // Palabra que rota entre plataformas
      const words = q(".h3__word") as HTMLElement[];
      gsap.set(words, { yPercent: 110, opacity: 0 });
      gsap.set(words[0], { yPercent: 0, opacity: 1 });
      const rotate = gsap.timeline({ repeat: -1, paused: true });
      words.forEach((word, i) => {
        const next = words[(i + 1) % words.length];
        rotate
          .to(word, { yPercent: -110, opacity: 0, duration: 0.6, ease: "power3.in" }, i * 2 + 1.6)
          .fromTo(next, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.7, ease: "expo.out" }, i * 2 + 2);
      });

      // Intro
      const intro = gsap.timeline({ paused: true, defaults: { ease: "expo.out" }, onComplete: () => void rotate.play() });
      intro
        .fromTo(q(".h3__lines i"), { scaleY: 0 }, { scaleY: 1, duration: 1.8, ease: "expo.inOut", stagger: 0.08 }, 0)
        .fromTo(q(".h3__name [data-intro-line] .ch"), { y: 0, yPercent: 115 }, { yPercent: 0, duration: 1.5, stagger: 0.04 }, 0.15)
        .fromTo(q(".h3__echo"), { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 2, stagger: 0.15 }, 0.6)
        .fromTo(
          q("[data-intro]"),
          { opacity: 0, y: 22, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, stagger: 0.08, clearProps: "filter" },
          0.55,
        )
        .fromTo(q(".h3__platform"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.04 }, 1);
      const stop = onIntroDone(() => intro.play());

      // Puntero: los ecos se desplazan con profundidad y el brillo lo sigue
      const glow = q(".h3__glow")[0] as HTMLElement;
      const echoes = q(".h3__echo") as HTMLElement[];
      const movers = echoes.map((el, i) => ({
        x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" }),
        y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" }),
        depth: (i + 1) * 18,
      }));
      const gx = gsap.quickTo(glow, "x", { duration: 1, ease: "power3.out" });
      const gy = gsap.quickTo(glow, "y", { duration: 1, ease: "power3.out" });
      const move = (e: PointerEvent) => {
        const r = root.current!.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        movers.forEach((m) => {
          m.x(px * m.depth);
          m.y(py * m.depth);
        });
        gx(e.clientX - r.left);
        gy(e.clientY - r.top);
        glow.style.opacity = "1";
      };
      if (window.matchMedia("(pointer: fine)").matches) root.current!.addEventListener("pointermove", move);

      // Scroll: el nombre crece y se desvanece mientras sube la siguiente sección
      gsap
        .timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } })
        .to(q(".h3__stage"), { scale: 1.25, opacity: 0, yPercent: -6 }, 0)
        .to(q(".h3__below"), { opacity: 0, y: -40 }, 0)
        .to(q(".h3__lines"), { opacity: 0 }, 0);

      return () => {
        stop();
        rotate.kill();
        root.current?.removeEventListener("pointermove", move);
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} id="top" className="h3 noise">
      <div className="h3__lines" aria-hidden>
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="h3__glow" aria-hidden />

      <div className="container-x h3__inner">
        <div data-intro className="h3__meta">
          <span className="h3__pill">
            <span className="pulse-dot" aria-hidden />
            {tr(HERO.available, locale)}
          </span>
          <span className="h3__origin">{tr(HERO.origin, locale)}</span>
        </div>

        <h1 className="h3__stage">
          <span data-intro className="h3__kicker">
            {tr(HERO.role, locale)}
          </span>
          <span className="h3__name t-display">
            <span className="h3__echo h3__echo--1" aria-hidden>
              <span>Vincenzo</span>
              <span>Zoffoli</span>
            </span>
            <span className="h3__echo h3__echo--2" aria-hidden>
              <span>Vincenzo</span>
              <span>Zoffoli</span>
            </span>
            <span className="line-mask" data-intro-line>
              <span>
                <Chars text="Vincenzo" />
              </span>
            </span>
            <span className="line-mask" data-intro-line>
              <span>
                <Chars text="Zoffoli" />
              </span>
            </span>
          </span>
        </h1>

        <div className="h3__below">
          <p data-intro className="h3__rotator">
            <span>{locale === "es" ? "Sitios a medida con" : "Custom websites with"}</span>
            <span className="h3__words" aria-hidden>
              {ROTATOR.map((w) => (
                <span key={w} className="h3__word">
                  {w}
                </span>
              ))}
            </span>
            <span className="sr-only">{ROTATOR.join(", ")}</span>
          </p>

          <p data-intro className="h3__lead">
            {tr(HERO.lead, locale)}
          </p>

          <div data-intro className="flex flex-wrap justify-center gap-3">
            <Magnetic>
              <a href="#proyectos" onClick={(e) => (e.preventDefault(), scrollToId("proyectos"))} className="btn btn-rose">
                <span>{tr(HERO.primary, locale)}</span>
                <ArrowDown className="btn-arrow size-4" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href={`mailto:${PROFILE.email}`} className="btn btn-ghost-dark">
                <span>{tr(HERO.secondary, locale)}</span>
                <ArrowUpRight className="btn-arrow size-4" />
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      <div className="container-x h3__below">
        <div className="h3__platforms">
          <ul>
            {PLATFORMS.map((name) => {
              const icon = TOOL_ICONS[name];
              return (
                <li key={name} className="h3__platform">
                  {icon && "path" in icon && (
                    <svg viewBox="0 0 24 24" aria-hidden>
                      <path d={icon.path} />
                    </svg>
                  )}
                  <span>{name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
