import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales – ASOMOVIT SYNDIC",
  description: "Mentions légales du site ASOMOVIT SYNDIC, syndic de copropriété à Marrakech.",
  robots: { index: false, follow: false },
};

export default function MentionsLegalesPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16 md:py-24">
      <h1 className="font-heading text-3xl font-bold md:text-4xl">Mentions légales</h1>
      <p className="mt-2 text-sm text-muted-foreground">Dernière mise à jour : mai 2026</p>

      <section className="mt-10 space-y-8 text-sm leading-relaxed text-foreground/85">
        <div>
          <h2 className="font-heading text-lg font-semibold text-foreground">Éditeur du site</h2>
          <p className="mt-2">
            <strong>ASOMOVIT MULTISERVICES</strong>
            <br />
            Société marocaine spécialisée dans la gestion de copropriétés
            <br />
            Adresse : Allal El Fassi, Marrakech, Maroc
            <br />
            Téléphone :{" "}
            <a href="tel:+212661901209" className="text-primary hover:text-accent">
              +212 661-901209
            </a>
            <br />
            Email :{" "}
            <a
              href="mailto:direction@asomovitmultiservices.com"
              className="text-primary hover:text-accent"
            >
              direction@asomovitmultiservices.com
            </a>
          </p>
        </div>

        <div>
          <h2 className="font-heading text-lg font-semibold text-foreground">Hébergement</h2>
          <p className="mt-2">
            Ce site est hébergé par <strong>Vercel Inc.</strong>, 340 Pine Street, Suite 701, San
            Francisco, CA 94104, États-Unis.
            <br />
            Site web :{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-accent"
            >
              vercel.com
            </a>
          </p>
        </div>

        <div>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Propriété intellectuelle
          </h2>
          <p className="mt-2">
            L&apos;ensemble du contenu de ce site (textes, images, logos, vidéos) est la propriété
            exclusive d&apos;ASOMOVIT MULTISERVICES ou de ses partenaires. Toute reproduction,
            représentation ou diffusion, totale ou partielle, sans autorisation écrite préalable est
            strictement interdite.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Limitation de responsabilité
          </h2>
          <p className="mt-2">
            ASOMOVIT MULTISERVICES s&apos;efforce de maintenir les informations publiées sur ce site
            à jour et exactes. Toutefois, la société ne saurait être tenue responsable des erreurs
            ou omissions, ni des dommages directs ou indirects résultant de l&apos;utilisation de ce
            site.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-lg font-semibold text-foreground">Droit applicable</h2>
          <p className="mt-2">
            Le présent site et ses mentions légales sont soumis au droit marocain. Tout litige
            relatif à l&apos;utilisation de ce site sera soumis à la compétence exclusive des
            tribunaux de Marrakech, Maroc.
          </p>
        </div>
      </section>

      <div className="mt-12">
        <Link href="/" className="text-sm font-medium text-primary hover:text-accent">
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
