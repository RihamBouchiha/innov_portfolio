export const locales = ["fr", "en"];
export const defaultLocale = "fr";

export function isLocale(value) {
  return locales.includes(value);
}

export function localizePath(pathname, locale) {
  const segments = pathname.split("/").filter(Boolean);
  if (isLocale(segments[0])) segments[0] = locale;
  else segments.unshift(locale);
  return `/${segments.join("/")}`;
}
