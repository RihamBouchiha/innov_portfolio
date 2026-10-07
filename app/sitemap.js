import { SITE_URL } from "../lib/constants";
import { locales } from "../lib/i18n";

export const dynamic = "force-static";
export default function sitemap() {
  const paths = ["", "/club", "/play"];
  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
      alternates: {
        languages: { fr: `${SITE_URL}/fr${path}`, en: `${SITE_URL}/en${path}` },
      },
    })),
  );
}
