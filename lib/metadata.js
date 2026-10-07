import { SITE_URL } from "./constants";

const localized = {
  fr: {
    title: "Innoverse — Club d’innovation de l’ENIAD",
    description:
      "Découvrez le club Innoverse, son équipe, ses ateliers et ses événements à l’ENIAD.",
  },
  en: {
    title: "Innoverse — ENIAD Innovation Club",
    description:
      "Discover Innoverse, its student team, workshops, and events at ENIAD.",
  },
};

export function createMetadata(locale, pathname = "") {
  const copy = localized[locale] ?? localized.fr;
  const suffix = pathname ? `/${pathname}` : "";
  return {
    metadataBase: new URL(SITE_URL),
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: `/${locale}${suffix}`,
      languages: { fr: `/fr${suffix}`, en: `/en${suffix}` },
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
      images: [
        {
          url: "/innoverse-logo.png",
          width: 1200,
          height: 1200,
          alt: "Innoverse",
        },
      ],
    },
  };
}
