"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

const INTERACTIVE = "a, button, [role=button], input, textarea, select, label, summary";

/**
 * Anillo con retardo (lerp) + punto preciso. Crece sobre elementos
 * interactivos y muestra una etiqueta sobre los que tienen data-cursor.
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || prefersReducedMotion()) return;
    const html = document.documentElement;
    html.classList.add("has-cursor");

    let tx = innerWidth / 2,
      ty = innerHeight / 2,
      rx = tx,
      ry = ty,
      raf = 0,
      visible = false;

    const show = (v: boolean) => {
      if (visible === v) return;
      visible = v;
      ring.current!.style.opacity = dot.current!.style.opacity = v ? "1" : "0";
    };

    const tick = () => {
      rx += (tx - rx) * 0.16;
      ry += (ty - ry) * 0.16;
      ring.current!.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      dot.current!.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      show(true);
    };
    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      const el = ring.current!;
      if (labelled) {
        label.current!.textContent = labelled.dataset.cursor || "";
        el.classList.add("is-label");
        el.classList.remove("is-hover");
      } else {
        el.classList.remove("is-label");
        el.classList.toggle("is-hover", !!target?.closest(INTERACTIVE));
      }
    };
    const onDown = () => ring.current!.classList.add("is-down");
    const onUp = () => ring.current!.classList.remove("is-down");
    const onLeave = () => show(false);

    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      html.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor" aria-hidden>
        <div className="cursor__ring">
          <span ref={label} className="cursor__label" />
        </div>
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  );
}
