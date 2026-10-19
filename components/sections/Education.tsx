import { EDUCATION, tr, type Locale } from "@/lib/content";
import { LogoTile } from "../ui/Logo";

export function Education({ locale }: { locale: Locale }) {
  return (
    <section data-recede className="surface-paper section-y relative isolate !pt-0">
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow text-muted" data-reveal>
            {tr(EDUCATION.eyebrow, locale)}
          </p>
          <h2 className="t-h2 t-h2--side mt-4 text-ink" data-paint>
            {tr(EDUCATION.title, locale)}
          </h2>
        </div>
        <ul className="lg:col-span-8">
          {EDUCATION.items.map((e) => (
            <li key={e.degree.es} className="edu-row isolate flex items-center gap-5 px-2 py-6 sm:px-4" data-reveal>
              <LogoTile src={e.logo} name={e.school} />
              <div className="min-w-0 flex-1">
                <p className="t-h3 text-ink">{tr(e.degree, locale)}</p>
                <p className="mt-1 text-sm text-muted">{e.school}</p>
              </div>
              <span className="t-mono hidden shrink-0 text-subtle sm:block">{e.period}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
