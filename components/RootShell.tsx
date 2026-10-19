import "@/app/globals.css";
import { fontVariables } from "@/lib/fonts";
import type { Locale } from "@/lib/content";

/**
 * Corre antes del primer pintado: marca que hay JS (para ocultar lo que
 * se va a animar), si el intro ya se vio en esta sesión y si el usuario
 * pidió menos movimiento. Así no hay parpadeo antes de hidratar.
 */
const BOOT = `(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('vz-intro'))d.classList.add('intro-seen')}catch(e){}if(matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('reduce','intro-seen')})();`;

export function RootShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <html lang={locale === "es" ? "es" : "en"} className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
