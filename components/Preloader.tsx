"use client";

import { useRef } from "react";
import { gsap, useGSAP, markIntroDone } from "@/lib/motion";

const NAME = "VINCENZO ZOFFOLI";

/**
 * Contador 000 → 100 con el nombre escribiéndose letra a letra; al final
 * la pantalla se parte en dos mitades con un filo rojo (cortina de
 * Baires + preloader de ViperTech). Una sola vez por sesión.
 */
export function Preloader({ label }: { label: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const html = document.documentElement;
      if (html.classList.contains("intro-seen")) {
        markIntroDone();
        return;
      }

      const count = { v: 0 };
      const num = root.current!.querySelector<HTMLElement>("[data-count]")!;
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        onComplete: () => {
          html.classList.add("intro-seen");
          try {
            sessionStorage.setItem("vz-intro", "1");
          } catch {}
        },
      });

      tl.from("[data-ld-char]", { yPercent: 110, duration: 0.9, stagger: 0.03 }, 0.1)
        .from("[data-ld-meta]", { opacity: 0, y: 10, duration: 0.8, stagger: 0.08 }, 0.3)
        .to(count, {
          v: 100,
          duration: 1.7,
          ease: "power2.inOut",
          onUpdate: () => {
            num.textContent = String(Math.round(count.v)).padStart(3, "0");
          },
        }, 0.1)
        .to("[data-ld-bar]", { scaleX: 1, duration: 1.7, ease: "power2.inOut" }, 0.1)
        .to("[data-ld-content]", { opacity: 0, y: -24, duration: 0.5, ease: "power2.in" }, ">-0.05")
        .to(".loader__edge", { scaleX: 1, duration: 0.55, ease: "expo.inOut" }, "<0.1")
        .add(() => markIntroDone(), ">-0.15")
        .to(".loader__half--top", { yPercent: -101, duration: 1.1, ease: "expo.inOut" }, ">-0.05")
        .to(".loader__half--bottom", { yPercent: 101, duration: 1.1, ease: "expo.inOut" }, "<")
        .set(root.current, { display: "none" });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="loader" role="status" aria-label={label}>
      <div className="loader__half loader__half--top">
        <span className="loader__edge" />
      </div>
      <div className="loader__half loader__half--bottom">
        <span className="loader__edge" />
      </div>
      <div className="loader__content" data-ld-content>
        <div className="container-x flex h-full flex-col justify-between py-8">
          <div className="flex items-center justify-between t-mono text-on-dark-muted">
            <span data-ld-meta>Portfolio — 2026</span>
            <span data-ld-meta>CL → CR</span>
          </div>
          <div className="text-center">
            <p className="t-display text-[clamp(2.5rem,8vw,7rem)]" aria-hidden>
              {NAME.split("").map((c, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom">
                  <span data-ld-char className="inline-block">
                    {c === " " ? " " : c}
                  </span>
                </span>
              ))}
            </p>
          </div>
          <div className="flex items-end justify-between gap-6">
            <span data-ld-meta className="t-mono text-on-dark-muted">
              Frontend UI/UX
            </span>
            <div className="flex flex-1 items-center gap-6">
              <div className="hprogress flex-1">
                <span data-ld-bar />
              </div>
              <span data-count className="t-display text-[clamp(3rem,7vw,6rem)] tabular-nums text-brand-light">
                000
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
