"use client";

import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/motion";

/**
 * Sistema global por atributos:
 *  - [data-reveal]          sube y aparece (en lote, con stagger)
 *  - [data-reveal="clip"]   se abre desde un recorte redondeado
 *  - [data-parallax="N"]    se desplaza N% en Y mientras cruza la pantalla
 */
export function Reveals() {
  useGSAP(() => {
    if (prefersReducedMotion()) return;

    ScrollTrigger.batch("[data-reveal]:not([data-reveal='clip'])", {
      start: "top 88%",
      once: true,
      onEnter: (els) =>
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.08,
          overwrite: true,
        }),
    });

    gsap.utils.toArray<HTMLElement>("[data-reveal='clip']").forEach((el) => {
      gsap.to(el, {
        clipPath: "inset(0% 0% 0% 0% round 1.5rem)",
        duration: 1.4,
        ease: "expo.inOut",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });

    gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
      const amount = parseFloat(el.dataset.parallax || "10");
      gsap.fromTo(
        el,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });

    // [data-paint]: el título se pinta letra a letra al ritmo del scroll (Corazón)
    gsap.utils.toArray<HTMLElement>("[data-paint]").forEach((el) => {
      const text = el.textContent ?? "";
      el.setAttribute("aria-label", text);
      el.innerHTML = text
        .split(" ")
        .map((word) => `<span class="pw" aria-hidden="true">${[...word].map((c) => `<span class="pc">${c}</span>`).join("")}</span>`)
        .join(" ");
      gsap.fromTo(
        el.querySelectorAll(".pc"),
        { opacity: 0.14, yPercent: 18 },
        { opacity: 1, yPercent: 0, ease: "none", stagger: 0.05, scrollTrigger: { trigger: el, start: "top 90%", end: "top 52%", scrub: 0.6 } },
      );
    });

    // [data-recede]: cuando la sección siguiente sube encima, esta se aleja un
    // poco más lento y se oscurece con un velo (traspaso apilado de estate).
    gsap.utils.toArray<HTMLElement>("[data-recede]").forEach((el) => {
      const next = (el.nextElementSibling ?? el.parentElement?.nextElementSibling) as HTMLElement | null;
      if (!next) return;
      const veil = document.createElement("div");
      veil.className = "recede-veil";
      veil.setAttribute("aria-hidden", "true");
      el.appendChild(veil);
      const st = { trigger: next, start: "top bottom", end: "top top", scrub: true };
      gsap.fromTo(veil, { opacity: 0 }, { opacity: 0.55, ease: "power1.in", scrollTrigger: st });
      gsap.fromTo(el, { y: 0 }, { y: () => window.innerHeight * 0.08, ease: "none", scrollTrigger: { ...st, invalidateOnRefresh: true } });
    });

    // Las fuentes y las imágenes cambian alturas: recalcular al terminar de cargar.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh, { once: true });
  });

  return null;
}
