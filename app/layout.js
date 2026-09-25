import "./globals.css";

export const metadata = {
  title: "Innoverse — Mind Gate",
  description: "Relève un défi et découvre l'univers Innoverse.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
