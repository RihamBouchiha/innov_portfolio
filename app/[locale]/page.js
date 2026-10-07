import { notFound } from "next/navigation";

import LandingPage from "../../components/home/LandingPage";
import { getDictionary } from "../../content/dictionaries";
import { isLocale } from "../../lib/i18n";

export default async function HomePage({ params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <LandingPage locale={locale} dictionary={getDictionary(locale)} />;
}
