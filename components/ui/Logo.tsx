/* eslint-disable @next/next/no-img-element */

/** Logo de empresa/institución en una baldosa; si no hay imagen, monograma. */
export function LogoTile({ src, name, size = "md", contain = false }: { src: string | null; name: string; size?: "md" | "sm" | "xs"; contain?: boolean }) {
  const cls = `logo-tile ${size === "sm" ? "logo-tile--sm" : size === "xs" ? "logo-tile--xs" : ""} ${contain ? "logo-tile--contain" : ""}`;
  if (!src) {
    const initials = name
      .replace(/^(Espacio|Instituto|Universidad)\s+/i, "")
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
    return (
      <span className={`${cls} !bg-ink-3 !border-ink-3 font-heading text-sm text-on-dark`} aria-hidden>
        {initials}
      </span>
    );
  }
  return (
    <span className={cls}>
      <img src={src} alt="" width={52} height={52} loading="lazy" decoding="async" />
    </span>
  );
}
