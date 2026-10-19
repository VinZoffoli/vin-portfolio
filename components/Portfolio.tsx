import { UI, tr, type Locale } from "@/lib/content";
import { Preloader } from "./Preloader";
import { Header } from "./Header";
import { Cursor } from "./Cursor";
import { SmoothScroll } from "./motion/SmoothScroll";
import { Reveals } from "./motion/Reveals";
import { StructuredData } from "./StructuredData";
import { Hero } from "./sections/Hero";
import { KineticBand } from "./sections/KineticBand";
import { About } from "./sections/About";
import { Experience } from "./sections/Experience";
import { RestoWork } from "./sections/RestoWork";
import { ViperWork } from "./sections/ViperWork";
import { Stack } from "./sections/Stack";
import { Process } from "./sections/Process";
import { Education } from "./sections/Education";
import { Contact } from "./sections/Contact";

export function Portfolio({ locale }: { locale: Locale }) {
  return (
    <>
      <StructuredData locale={locale} />
      <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-brand focus:px-5 focus:py-3 focus:text-white">
        {tr(UI.skip, locale)}
      </a>
      <Preloader label={tr(UI.loader, locale)} />
      <SmoothScroll />
      <Cursor />
      <div className="grain-wrap" aria-hidden>
        <div className="grain" />
      </div>
      <Header locale={locale} />
      <main id="contenido">
        <Hero locale={locale} />
        <KineticBand />
        <About locale={locale} />
        <Experience locale={locale} />
        <RestoWork locale={locale} />
        <ViperWork locale={locale} />
        <Stack locale={locale} />
        <Process locale={locale} />
        <Education locale={locale} />
      </main>
      <Contact locale={locale} />
      <Reveals />
    </>
  );
}
