"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export { gsap, ScrollTrigger, useGSAP };

export const EASE = {
  out: "expo.out",
  inOut: "expo.inOut",
  luxe: "power4.out",
};

declare global {
  interface Window {
    __lenis?: Lenis;
    __introDone?: boolean;
  }
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * El preloader avisa cuando termina; el hero espera ese aviso para
 * arrancar su intro. Si el preloader no corre (ya visto en la sesión o
 * reduced motion), el aviso llega de inmediato.
 */
export const INTRO_EVENT = "vz:intro";

export function onIntroDone(cb: () => void) {
  if (window.__introDone) {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener(INTRO_EVENT, handler, { once: true });
  return () => window.removeEventListener(INTRO_EVENT, handler);
}

export function markIntroDone() {
  if (window.__introDone) return;
  window.__introDone = true;
  window.__lenis?.start();
  window.dispatchEvent(new Event(INTRO_EVENT));
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: 0, duration: 1.4 });
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
}
