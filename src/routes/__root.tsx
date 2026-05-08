import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingContact } from "@/components/FloatingContact";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page introuvable</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

const SITE_URL = "https://asomovit-syndic-web.lovable.app";
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

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "author", content: "ASOMOVIT SYNDIC" },
      { name: "geo.region", content: "MA-MAR" },
      { name: "geo.placename", content: "Marrakech" },
      { name: "language", content: "fr" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "fr_MA" },
      { property: "og:site_name", content: "ASOMOVIT SYNDIC" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: SITE_URL },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(localBusinessJsonLd),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <FloatingContact />
      <Toaster richColors position="top-center" />
    </div>
  );
}
