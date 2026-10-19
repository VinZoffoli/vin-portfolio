"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import Link from "next/link";
import { gsap, useGSAP, prefersReducedMotion, scrollToId } from "@/lib/motion";
import { CONTACT, PROFILE, tr, type Locale } from "@/lib/content";
import { ArrowUpRight, Check, Copy } from "../ui/Icons";
import { Magnetic } from "../ui/Magnetic";

export function Contact({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const big = tr(CONTACT.big, locale);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      gsap.fromTo(
        q("[data-big] .ch"),
        { yPercent: 105 },
        { yPercent: 0, duration: 1.3, ease: "expo.out", stagger: 0.05, scrollTrigger: { trigger: q("[data-big]")[0], start: "top 95%", once: true } },
      );
      // Portal (Showdown): el panel se abre como un círculo que crece desde arriba
      gsap.fromTo(
        root.current,
        { clipPath: "circle(9% at 50% 0%)" },
        {
          clipPath: "circle(150% at 50% 0%)",
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 15%", scrub: 0.6 },
        },
      );
      gsap.fromTo(
        q(".portal-content"),
        { scale: 0.94, yPercent: 6 },
        { scale: 1, yPercent: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 15%", scrub: 0.6 } },
      );

      gsap.from(q(".social-row"), {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.07,
        scrollTrigger: { trigger: q(".social-row")[0], start: "top 90%", once: true },
      });
    },
    { scope: root },
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  return (
    <footer ref={root} id="contacto" className="sheet brand-panel overflow-hidden rounded-t-sheet p-1">
      <img src="/brand/viper-symbol.png" alt="" aria-hidden width={122} height={280} className="pointer-events-none absolute right-[4%] top-10 h-[17rem] w-auto opacity-[0.08] brightness-0 invert md:h-[25rem]" />

      <div className="portal-content container-x relative pb-10 pt-[clamp(5rem,10vw,8rem)]">
        <p className="eyebrow text-on-dark/80" data-reveal>
          {tr(CONTACT.eyebrow, locale)}
        </p>
        <h2 className="t-h2 mt-5 max-w-4xl" data-paint>
          {tr(CONTACT.title, locale)}
        </h2>
        <p className="t-lead mt-6 max-w-[48ch] text-on-dark/80" data-reveal>
          {tr(CONTACT.lead, locale)}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3" data-reveal>
          <Magnetic>
            <a href={`mailto:${PROFILE.email}`} className="btn bg-on-dark text-ink before:!bg-ink hover:text-on-dark">
              <span>{PROFILE.email}</span>
              <ArrowUpRight className="btn-arrow size-4" />
            </a>
          </Magnetic>
          <button type="button" onClick={copy} className="btn btn-ghost-dark" aria-live="polite">
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            <span>{copied ? tr(CONTACT.copied, locale) : tr(CONTACT.copy, locale)}</span>
          </button>
        </div>
      </div>

      <div className="footer-ink relative rounded-card pb-8 pt-12 text-on-dark">
        <div className="container-x">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <ul className="lg:col-span-7">
            {PROFILE.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="social-row group flex items-center justify-between gap-4 py-5">
                  <span className="t-display text-[clamp(2rem,4vw,3.25rem)]">{s.label}</span>
                  <span className="flex items-center gap-4">
                    <span className="t-mono hidden text-on-dark-muted sm:inline">{s.handle}</span>
                    <ArrowUpRight className="arrow size-6 text-brand-light" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col justify-between gap-8 lg:col-span-5 lg:pl-10">
            <address className="not-italic text-on-dark-muted">
              <p className="t-mono uppercase">{locale === "es" ? "Ubicación" : "Location"}</p>
              <p className="mt-2 font-heading text-lg text-on-dark">Guápiles, Limón, Costa Rica</p>
              <p className="mt-1 text-sm">{locale === "es" ? "Trabajo remoto con clientes de toda Latinoamérica, EE. UU. y Europa." : "Working remotely with clients across Latin America, the US and Europe."}</p>
            </address>
            <a href="#top" onClick={(e) => (e.preventDefault(), scrollToId("top"))} className="t-mono u-link self-start uppercase text-on-dark-muted hover:text-on-dark">
              ↑ {tr(CONTACT.top, locale)}
            </a>
          </div>
        </div>

        <p data-big className="t-display big-word mt-14 select-none overflow-hidden whitespace-nowrap text-center" aria-hidden>
          {big.split("").map((c, i) => (
            <span key={i} className="ch">
              {c === " " ? " " : c}
            </span>
          ))}
          <span className="ch text-brand-light">.</span>
        </p>

        <div className="mt-8 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-sm text-on-dark-muted sm:flex-row">
          <p>© 2026 {PROFILE.name}</p>
          <p>{tr(CONTACT.footer, locale)}</p>
          <nav aria-label={locale === "es" ? "Idioma" : "Language"} className="flex gap-4">
            <Link href="/" hrefLang="es" className={locale === "es" ? "text-on-dark" : "hover:text-on-dark"}>
              Español
            </Link>
            <Link href="/en" hrefLang="en" className={locale === "en" ? "text-on-dark" : "hover:text-on-dark"}>
              English
            </Link>
          </nav>
        </div>
        </div>
      </div>
    </footer>
  );
}
