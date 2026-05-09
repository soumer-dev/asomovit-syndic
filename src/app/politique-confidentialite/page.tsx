import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de confidentialité – ASOMOVIT SYNDIC",
  description:
    "Politique de confidentialité et traitement des données personnelles — ASOMOVIT SYNDIC.",
  robots: { index: false, follow: false },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16 md:py-24">
      <h1 className="font-heading text-3xl font-bold md:text-4xl">Politique de confidentialité</h1>
      <p className="mt-2 text-sm text-muted-foreground">Dernière mise à jour : mai 2026</p>

      <section className="mt-10 space-y-8 text-sm leading-relaxed text-foreground/85">
        <div>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Responsable du traitement
          </h2>
          <p className="mt-2">
            <strong>ASOMOVIT MULTISERVICES</strong>
            <br />
            Allal El Fassi, Marrakech, Maroc
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
          <h2 className="font-heading text-lg font-semibold text-foreground">Données collectées</h2>
          <p className="mt-2">
            Lors de l&apos;utilisation du formulaire de contact, nous collectons les informations
            suivantes :
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Nom complet</li>
            <li>Adresse email</li>
            <li>Numéro de téléphone</li>
            <li>Nom de la résidence (optionnel)</li>
            <li>Nombre de lots (optionnel)</li>
            <li>Message</li>
          </ul>
        </div>

        <div>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Finalité du traitement
          </h2>
          <p className="mt-2">
            Les données collectées sont utilisées exclusivement pour répondre à vos demandes de
            devis ou d&apos;information, et pour vous contacter dans le cadre de nos services de
            syndic de copropriété.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Conservation des données
          </h2>
          <p className="mt-2">
            Vos données sont conservées pendant une durée maximale de 3 ans à compter de votre
            dernière interaction avec nos services, sauf obligation légale contraire.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Partage des données
          </h2>
          <p className="mt-2">
            Vos données ne sont jamais vendues ni cédées à des tiers à des fins commerciales. Elles
            peuvent être transmises à nos prestataires techniques (hébergement, envoi d&apos;emails)
            dans le strict cadre de l&apos;exécution de nos services.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-lg font-semibold text-foreground">Vos droits</h2>
          <p className="mt-2">
            Conformément à la loi marocaine n° 09-08 relative à la protection des personnes
            physiques à l&apos;égard du traitement des données à caractère personnel, vous disposez
            d&apos;un droit d&apos;accès, de rectification, d&apos;opposition et de suppression de
            vos données. Pour exercer ces droits, contactez-nous à :{" "}
            <a
              href="mailto:direction@asomovitmultiservices.com"
              className="text-primary hover:text-accent"
            >
              direction@asomovitmultiservices.com
            </a>
          </p>
        </div>

        <div>
          <h2 className="font-heading text-lg font-semibold text-foreground">Cookies</h2>
          <p className="mt-2">
            Ce site peut utiliser Google Tag Manager et Google reCAPTCHA, qui déposent des cookies
            techniques et analytiques. Vous pouvez configurer votre navigateur pour refuser les
            cookies, ce qui peut affecter certaines fonctionnalités du site.
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
