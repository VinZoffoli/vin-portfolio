import localFont from "next/font/local";
import { Atkinson_Hyperlegible_Next, Geist_Mono } from "next/font/google";

/** Display: titulares gigantes (misma tipografía que ViperTech). */
export const display = localFont({
  src: "../public/fonts/cook-conthic.woff2",
  weight: "400",
  variable: "--font-display-face",
  display: "swap",
  fallback: ["Arial Narrow", "Impact", "sans-serif"],
});

/** Títulos secundarios: nombres de proyectos, empresas y grupos. */
export const heading = localFont({
  src: "../public/fonts/bilmond-semibold.woff2",
  weight: "600",
  variable: "--font-heading-face",
  display: "swap",
});

export const body = Atkinson_Hyperlegible_Next({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body-face",
  display: "swap",
});

export const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono-face",
  display: "swap",
});

export const fontVariables = [display.variable, heading.variable, body.variable, mono.variable].join(" ");
