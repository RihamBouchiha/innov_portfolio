import "../../styles/tokens.css";
import "../globals.css";
import "../readability.css";

import { dmSans, spaceGrotesk } from "../../lib/fonts";
import { createMetadata } from "../../lib/metadata";

export const metadata = {
  ...createMetadata("fr"),
  alternates: { canonical: "/", languages: { fr: "/fr", en: "/en" } },
  icons: { icon: "/innoverse-logo.png" },
};

export default function DefaultRootLayout({ children }) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
