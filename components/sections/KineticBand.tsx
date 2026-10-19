"use client";

import { Fragment, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/motion";
import { MARQUEE } from "@/lib/content";

function Row({ items, outline }: { items: string[]; outline?: boolean }) {
  const list = [...items, ...items];
  return (
    <div className="band__row t-display" data-band-row>
      {list.map((item, i) => (
        <Fragment key={i}>
          <span className={outline ? "text-outline" : i % 3 === 0 ? "text-gradient" : ""}>{item}</span>
          <span className="band__sep" aria-hidden>
            {"//"}
          </span>
        </Fragment>
      ))}
    </div>
  );
}

/** Dos filas que se cruzan con el scroll e inclinan según la velocidad. */
export function KineticBand() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const [a, b] = gsap.utils.toArray<HTMLElement>("[data-band-row]");
      const distance = () => window.innerWidth * 0.45;
      const st = { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.6 };
      gsap.fromTo(a, { x: 0 }, { x: () => -distance(), ease: "none", scrollTrigger: st });
      gsap.fromTo(b, { x: () => -distance() * 1.4 }, { x: () => -distance() * 0.4, ease: "none", scrollTrigger: st });

      // Entrada en escalera (hero de estate): 8 franjas suben con desfase y
      // aceleración suave, como un telón que se levanta por partes.
      const el = root.current!;
      const STRIPS = 8;
      const STAGGER = 0.06;
      const ease = gsap.parseEase("power3.inOut");
      const local = (p: number, i: number) => ease(Math.min(1, Math.max(0, (p - i * STAGGER) / (1 - (STRIPS - 1) * STAGGER))));
      const clipFor = (p: number) => {
        const pts: string[] = ["0% 100%"];
        for (let i = 0; i < STRIPS; i++) {
          const y = (100 - local(p, i) * 100).toFixed(2);
          pts.push(`${((100 / STRIPS) * i).toFixed(3)}% ${y}%`, `${((100 / STRIPS) * (i + 1)).toFixed(3)}% ${y}%`);
        }
        pts.push("100% 100%");
        return `polygon(${pts.join(", ")})`;
      };
      const wipe = { p: 0 };
      el.style.clipPath = clipFor(0);
      gsap.to(wipe, {
        p: 1,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "top 30%", scrub: 0.8 },
        onUpdate: () => {
          el.style.clipPath = wipe.p >= 1 ? "" : clipFor(wipe.p);
        },
      });

      const skew = gsap.quickTo([a, b], "skewX", { duration: 0.5, ease: "power3.out" });
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => skew(gsap.utils.clamp(-9, 9, self.getVelocity() / -260)),
      });
      const settle = () => {
        skew(0);
      };
      ScrollTrigger.addEventListener("scrollEnd", settle);
      return () => {
        ScrollTrigger.removeEventListener("scrollEnd", settle);
        el.style.clipPath = "";
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className="sheet surface-paper overflow-hidden py-[clamp(3rem,7vw,6rem)]" aria-hidden>
      <div className="band flex flex-col gap-[0.08em] text-ink">
        <Row items={MARQUEE.slice(0, 7)} />
        <Row items={MARQUEE.slice(7)} outline />
      </div>
    </section>
  );
}
