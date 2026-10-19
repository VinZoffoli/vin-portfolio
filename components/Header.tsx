"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap, useGSAP, onIntroDone, scrollToId } from "@/lib/motion";
import { UI, PROFILE, tr, type Locale } from "@/lib/content";
import { Magnetic } from "./ui/Magnetic";

export function Header({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const otherHref = locale === "es" ? "/en" : "/";

  // Entrada tras el intro + timeline del menú móvil
  useGSAP(
    () => {
      const bar = root.current!.querySelector(".header__bar");
      if (!document.documentElement.classList.contains("reduce")) {
        gsap.set(bar, { yPercent: -160, opacity: 0 });
        onIntroDone(() => gsap.to(bar, { yPercent: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.5 }));
      }

      tl.current = gsap
        .timeline({ paused: true })
        .set(menu.current, { visibility: "visible" })
        .to(menu.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.inOut" })
        .from("[data-mm-link] > span", { yPercent: 110, duration: 0.8, ease: "expo.out", stagger: 0.06 }, "-=0.35")
        .from("[data-mm-foot]", { opacity: 0, y: 20, duration: 0.6, ease: "power3.out", stagger: 0.05 }, "-=0.6");
    },
    { scope: root },
  );

  useEffect(() => {
    if (!tl.current) return;
    if (open) {
      window.__lenis?.stop();
      tl.current.timeScale(1).play();
    } else {
      window.__lenis?.start();
      tl.current.timeScale(1.6).reverse();
    }
  }, [open]);

  // Sección activa
  useEffect(() => {
    const ids = UI.nav.map((n) => n.id);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header ref={root} className="header">
      <div className="container-x">
        <div className="header__bar">
          <a href="#top" onClick={go("top")} className="flex items-center gap-3" aria-label="Vincenzo Zoffoli — inicio">
            <span className="grid size-9 place-items-center rounded-full bg-on-dark font-display text-lg leading-none text-ink">
              VZ
            </span>
            <span className="hidden font-heading text-[0.95rem] sm:inline">{PROFILE.name}</span>
          </a>

          <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
            {UI.nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={go(n.id)} className={`nav-link ${active === n.id ? "is-active" : ""}`}>
                {tr(n.label, locale)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={otherHref}
              hrefLang={locale === "es" ? "en" : "es"}
              className="t-mono grid h-10 place-items-center rounded-full border border-white/15 px-3.5 uppercase text-on-dark-muted transition-colors hover:text-on-dark"
              aria-label={locale === "es" ? "View in English" : "Ver en español"}
            >
              <span className="swap">
                <span>{locale === "es" ? "ES" : "EN"}</span>
                <span>{locale === "es" ? "EN" : "ES"}</span>
              </span>
            </Link>
            <span className="hidden sm:inline-block">
              <Magnetic strength={0.25}>
                <a href="#contacto" onClick={go("contacto")} className="btn btn-rose !min-h-11 !px-5 text-[0.9375rem]">
                  <span className="swap">
                    <span>{tr(UI.cta, locale)}</span>
                    <span>{tr(UI.cta, locale)}</span>
                  </span>
                </a>
              </Magnetic>
            </span>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full bg-on-dark text-ink lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? tr(UI.close, locale) : tr(UI.menu, locale)}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3 w-5" aria-hidden>
                <span className={`absolute left-0 h-[1.5px] w-full bg-current transition-transform duration-300 ${open ? "top-1/2 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-[1.5px] w-full bg-current transition-transform duration-300 ${open ? "top-1/2 -rotate-45" : "bottom-0"}`} />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div ref={menu} id="mobile-menu" className="mmenu noise lg:hidden" aria-hidden={!open}>
        <div className="container-x flex h-full flex-col justify-between pb-10 pt-32">
          <nav aria-label="Móvil" className="flex flex-col gap-1">
            {UI.nav.map((n, i) => (
              <a key={n.id} data-mm-link href={`#${n.id}`} onClick={go(n.id)} tabIndex={open ? 0 : -1} className="line-mask t-display text-[clamp(3rem,14vw,6rem)]">
                <span>
                  <span className="t-mono mr-3 align-top text-sm text-brand-light">0{i + 1}</span>
                  {tr(n.label, locale)}
                </span>
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-2 text-on-dark-muted">
            <a data-mm-foot href={`mailto:${PROFILE.email}`} tabIndex={open ? 0 : -1} className="font-heading text-lg text-on-dark">
              {PROFILE.email}
            </a>
            <div data-mm-foot className="flex flex-wrap gap-x-5 gap-y-1 t-mono">
              {PROFILE.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
