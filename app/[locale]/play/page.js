import { notFound } from "next/navigation";

import PlayExperience from "../../../components/games/PlayExperience";
import { getDictionary } from "../../../content/dictionaries";
import { createMetadata } from "../../../lib/metadata";
import { isLocale } from "../../../lib/i18n";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return createMetadata(locale, "play");
}

export default async function PlayRoute({ params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <PlayExperience locale={locale} dictionary={getDictionary(locale)} />;
}
