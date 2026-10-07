import { describe, expect, it } from "vitest";
import { localizePath } from "../lib/i18n";

describe("localized routing", () => {
  it.each([
    ["/fr", "en", "/en"],
    ["/en", "fr", "/fr"],
    ["/fr/club", "en", "/en/club"],
    ["/en/play", "fr", "/fr/play"],
    ["/club", "en", "/en/club"],
  ])("maps %s to %s", (pathname, locale, expected) => {
    expect(localizePath(pathname, locale)).toBe(expected);
  });
});
