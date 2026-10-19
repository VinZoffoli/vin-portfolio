"use client";

/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion";
import { VIPER, tr, type Locale } from "@/lib/content";
import { ArrowUpRight } from "../ui/Icons";
import { Magnetic } from "../ui/Magnetic";
import { LogoTile } from "../ui/Logo";

const Chevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {dir === "left" ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
  </svg>
);

/**
 * Carrusel: 3 tarjetas por vista (2 en tablet, 1 en móvil). Scroll nativo
 * con snap —se puede deslizar con el dedo o el trackpad— más flechas y
 * bullets por página.
 */
export function ViperWork({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [perView, setPerView] = useState(3);
  const [page, setPage] = useState(0);
  const total = VIPER.projects.length;
  const pages = Math.ceil(total / perView);
  const visit = locale === "es" ? "Visitar" : "Visit";

  const measure = useCallback(() => {
    const el = track.current;
    const card = el?.querySelector<HTMLElement>(".vcard");
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const pv = Math.max(1, Math.round((el.clientWidth + gap) / (card.offsetWidth + gap)));
    setPerView(pv);
    setPage(Math.min(Math.ceil(total / pv) - 1, Math.round(el.scrollLeft / (el.clientWidth + gap))));
  }, [total]);

  useEffect(() => {
    measure();
    const el = track.current!;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [measure]);

  const goTo = (p: number) => {
    const el = track.current;
    if (!el) return;
    const target = Math.max(0, Math.min(pages - 1, p));
    const cards = el.querySelectorAll<HTMLElement>(".vcard");
    const card = cards[Math.min(target * perView, cards.length - 1)];
    el.scrollTo({ left: card.offsetLeft - cards[0].offsetLeft, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(page + 1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(page - 1);
    }
  };

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      gsap.from(q(".vcard"), {
        y: 70,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: track.current, start: "top 85%", once: true },
      });
    },
    { scope: root },
  );

  const from = page * perView + 1;
  const to = Math.min(total, from + perView - 1);

  return (
    <section ref={root} data-recede className="viper sheet surface-paper section-y">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow flex items-center gap-3 text-muted" data-reveal>
              <LogoTile src="/logos/vipertech.png" name="ViperTech CR" size="xs" contain />
              {tr(VIPER.eyebrow, locale)}
            </p>
            <h2 className="t-h2 t-h2--side mt-4 text-ink" data-paint>
              {tr(VIPER.title, locale)}
            </h2>
          </div>
          <div className="flex flex-col items-start gap-6 lg:col-span-5" data-reveal>
            <p className="max-w-[50ch] text-muted">{tr(VIPER.lead, locale)}</p>
            <Magnetic>
              <a href={VIPER.allHref} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <span>{tr(VIPER.all, locale)}</span>
                <ArrowUpRight className="btn-arrow size-4" />
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="viper__carousel" role="region" aria-roledescription="carousel" aria-label={tr(VIPER.eyebrow, locale)} onKeyDown={onKey}>
          <ul ref={track} className="viper__track" tabIndex={0}>
            {VIPER.projects.map((p, i) => (
              <li key={p.slug} className="vcard">
                <a href={p.url} target="_blank" rel="noopener noreferrer" data-cursor={visit} className="group block">
                  <div className="vcard__media">
                    <img src={p.image} alt={`${p.name} — ${tr(p.kind, locale)}`} width={1400} height={1107} loading="lazy" decoding="async" />
                    <span className="vcard__index">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="vcard__body">
                    <div className="min-w-0">
                      <h3 className="t-h3 text-ink">{p.name}</h3>
                      <p className="mt-1 text-sm text-muted">
                        {tr(p.kind, locale)} · {p.place}
                      </p>
                    </div>
                    <span className="vcard__go" aria-hidden>
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>

          <div className="viper__controls">
            <p className="t-display viper__count" aria-live="polite">
              <span className="text-ink">
                {String(from).padStart(2, "0")}
                {to > from ? `–${String(to).padStart(2, "0")}` : ""}
              </span>
              <span className="text-subtle"> / {String(total).padStart(2, "0")}</span>
            </p>
            <div className="viper__dots">
              {Array.from({ length: pages }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-current={page === i}
                  aria-label={`${locale === "es" ? "Página" : "Page"} ${i + 1}`}
                  className="viper__dot"
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button type="button" className="viper__arrow" onClick={() => goTo(page - 1)} disabled={page === 0} aria-label={locale === "es" ? "Anteriores" : "Previous"}>
                <Chevron dir="left" />
              </button>
              <button type="button" className="viper__arrow" onClick={() => goTo(page + 1)} disabled={page >= pages - 1} aria-label={locale === "es" ? "Siguientes" : "Next"}>
                <Chevron dir="right" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
