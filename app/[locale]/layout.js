import { notFound } from "next/navigation";

import "../../styles/tokens.css";
import "../globals.css";
import "../readability.css";

import { dmSans, spaceGrotesk } from "../../lib/fonts";
import { isLocale, locales } from "../../lib/i18n";
import { createMetadata } from "../../lib/metadata";

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export async function generateMetadata({ params }) {
  const { locale } = await params;
  return { ...createMetadata(locale), icons: { icon: "/innoverse-logo.png" } };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html
      lang={locale}
      className={`${dmSans.variable} ${spaceGrotesk.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
