import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";


export const metadata: Metadata = {
  metadataBase: new URL("https://jangan-injak-itu.vercel.app"),
  title: {
    default: "Jangan Injak Itu! — Game Platformer Jebakan Absurd",
    template: "%s | Jangan Injak Itu!",
  },
  description: "Mainkan game platformer jebakan absurd langsung di browser. Tanpa login, tanpa download, cukup isi nama dan kalahkan high score lokal.",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "Jangan Injak Itu!",
    description: "Platformer jebakan absurd yang kelihatannya gampang, tetapi lantainya suka bohong.",
    type: "website",
    locale: "id_ID",
  },
};

export const viewport: Viewport = {
  themeColor: "#090A1A",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>
        <div className="page-grid">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
