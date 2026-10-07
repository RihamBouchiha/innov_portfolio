"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localizePath } from "../../lib/i18n";

export default function LocaleSwitcher({
  locale,
  label,
  className = "language-switch",
}) {
  const pathname = usePathname();
  const nextLocale = locale === "fr" ? "en" : "fr";
  return (
    <Link
      className={className}
      href={localizePath(pathname, nextLocale)}
      hrefLang={nextLocale}
      aria-label={label}
    >
      {nextLocale.toUpperCase()}
    </Link>
  );
}
