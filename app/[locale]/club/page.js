import { notFound } from "next/navigation";

import ClubPage from "../../../components/club/ClubPage";
import { getDictionary } from "../../../content/dictionaries";
import { createMetadata } from "../../../lib/metadata";
import { isLocale } from "../../../lib/i18n";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return createMetadata(locale, "club");
}

export default async function ClubRoute({ params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ClubPage locale={locale} dictionary={getDictionary(locale)} />;
}
