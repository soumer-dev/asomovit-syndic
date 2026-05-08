import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingContact } from "@/components/FloatingContact";
import { Toaster } from "@/components/ui/sonner";
import {
  GoogleTagManagerScript,
  GoogleTagManagerNoScript,
} from "@/components/analytics/GoogleTagManager";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const SITE_URL = "https://www.asomovit-syndic.ma";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "ASOMOVIT SYNDIC",
  description:
    "Syndic de copropriété professionnel à Marrakech. Gestion administrative, financière, technique et juridique conforme à la loi 18-00 / 106-12.",
  url: SITE_URL,
  telephone: "+212661901209",
  image: OG_IMAGE,
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Marrakech",
    addressRegion: "Marrakech-Safi",
    addressCountry: "MA",
  },
  areaServed: [
    { "@type": "City", name: "Marrakech" },
    { "@type": "AdministrativeArea", name: "Marrakech-Safi" },
  ],
  sameAs: [],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  authors: [{ name: "ASOMOVIT SYNDIC" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_MA",
    siteName: "ASOMOVIT SYNDIC",
    images: [{ url: OG_IMAGE }],
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE],
  },
  other: {
    "geo.region": "MA-MAR",
    "geo.placename": "Marrakech",
    language: "fr",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <GoogleTagManagerScript />
      </head>
      <body>
        <GoogleTagManagerNoScript />
        <div className="flex min-h-screen flex-col bg-background">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <FloatingContact />
          <Toaster richColors position="top-center" />
        </div>
      </body>
    </html>
  );
}
