import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const routes = [
  ["fr.html", "fr"],
  ["en.html", "en"],
  ["fr/club.html", "fr"],
  ["en/club.html", "en"],
  ["fr/play.html", "fr"],
  ["en/play.html", "en"],
];

for (const [file, locale] of routes) {
  test(`exports /${file.replace(/\.html$/, "")}`, async () => {
    const html = await readFile(
      new URL(`../out/${file}`, import.meta.url),
      "utf8",
    );
    assert.match(html, new RegExp(`<html lang="${locale}"`));
    assert.match(html, /Innoverse/i);
  });
}

test("exports locale-preserving navigation", async () => {
  const frenchHome = await readFile(
    new URL("../out/fr.html", import.meta.url),
    "utf8",
  );
  const frenchClub = await readFile(
    new URL("../out/fr/club.html", import.meta.url),
    "utf8",
  );
  assert.match(frenchHome, /href="\/fr\/club"/);
  assert.match(frenchHome, /href="\/fr\/play"/);
  assert.match(frenchClub, /href="\/en\/club"/);
});
