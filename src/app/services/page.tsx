import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import heroBg from "@/assets/hero-bg.webp";
import { FileText, Wallet, Vote, Hammer, Scale, Sparkles, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Nos services – ASOMOVIT SYNDIC à Marrakech",
  description:
    "Gestion administrative, financière, AG, travaux, juridique et entretien : découvrez tous nos services de syndic de copropriété à Marrakech.",
  openGraph: {
    title: "Nos services – ASOMOVIT SYNDIC",
    description:
      "Une prise en charge complète de votre copropriété, conforme à la loi 18-00 / 106-12.",
  },
};

const services = [
  {
    icon: FileText,
    title: "Gestion administrative",
    items: [
      "Mise à jour des dossiers",
      "Application du règlement",
      "Correspondance & communication",
      "Exécution des décisions d'AG",
      "Suivi des contrats & assurances",
    ],
  },
  {
    icon: Wallet,
    title: "Gestion financière & comptable",
    items: [
      "Budget prévisionnel",
      "Appels de fonds",
      "Comptabilité détaillée",
      "Répartition des charges",
      "Suivi des impayés",
      "Présentation annuelle des comptes",
    ],
  },
  {
    icon: Vote,
    title: "Assemblées générales",
    items: [
      "Convocations",
      "Ordre du jour",
      "Animation de l'AG",
      "Procès-verbaux",
      "Suivi des décisions",
    ],
  },
  {
    icon: Hammer,
    title: "Suivi des travaux & entretien",
    items: [
      "Analyse des besoins",
      "Recherche des prestataires",
      "Négociation des devis",
      "Suivi des interventions",
      "Contrôle qualité",
    ],
  },
  {
    icon: Scale,
    title: "Assistance juridique",
    items: [
      "Conseil en copropriété",
      "Gestion des conflits",
      "Conformité loi 18-00 / 106-12",
      "Suivi des contentieux",
    ],
  },
  {
    icon: Sparkles,
    title: "Entretien des parties communes",
    items: ["Nettoyage", "Espaces verts", "Maintenance courante"],
  },
];

export default function ServicesPage() {
  return (
    <div>
      <section className="relative isolate overflow-hidden py-20 text-primary-foreground md:py-28">
        <Image
          src={heroBg}
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="container mx-auto px-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Nos services</p>
          <h1 className="mt-3 max-w-3xl font-heading text-4xl font-bold leading-tight md:text-5xl">
            Une prise en charge complète de votre copropriété
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            Six pôles d&apos;expertise au service de votre tranquillité : administratif, financier,
            assemblées générales, travaux, juridique et entretien.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map(({ icon: Icon, title, items }) => (
            <article
              key={title}
              className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)] transition hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <Icon className="h-7 w-7" />
                </div>
                <h2 className="font-heading text-xl font-bold md:text-2xl">{title}</h2>
              </div>
              <ul className="mt-6 space-y-3">
                {items.map((it) => (
                  <li key={it} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span className="text-foreground/85">{it}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-secondary/60 p-8 text-center md:p-12">
          <h2 className="font-heading text-2xl font-bold md:text-3xl">
            Une question sur nos services ?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Recevez un devis gratuit et personnalisé sous 48 heures.
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-flex h-12 items-center justify-center rounded-md bg-accent px-7 text-sm font-semibold text-accent-foreground shadow-lg transition hover:brightness-105"
          >
            Demander un devis
          </Link>
        </div>
      </section>
    </div>
  );
}
