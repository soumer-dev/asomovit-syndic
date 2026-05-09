import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ShieldCheck,
  Clock,
  ClipboardList,
  MessageSquare,
  Award,
  Eye,
  Users,
  Settings2,
  Scale,
  FileText,
  Wallet,
  Vote,
  Hammer,
  Sparkles,
  ArrowRight,
  Quote,
} from "lucide-react";

import resAppel from "@/assets/residence-appel-garden.jpg";
import resOliviers from "@/assets/residence-riad-oliviers.jpg";
import resYasmina from "@/assets/residence-yasmina.jpg";
import resWarda from "@/assets/residence-warda.jpg";
import resRayhana from "@/assets/residence-rayhana.jpg";
import resHoriya from "@/assets/residence-al-horiya.jpg";

const SITE_URL = "https://syndic.asomovit.com";

export const metadata: Metadata = {
  title: "Syndic de copropriété à Marrakech | ASOMOVIT SYNDIC",
  description:
    "Syndic professionnel à Marrakech : gestion transparente, entretien, AG et conformité loi 18-00 / 106-12. Devis gratuit sous 48h.",
  keywords:
    "syndic Marrakech, syndic copropriété Marrakech, gestion copropriété Marrakech, loi 18-00, syndic professionnel Maroc, ASOMOVIT",
  openGraph: {
    title: "Syndic de copropriété à Marrakech | ASOMOVIT SYNDIC",
    description:
      "Gestion transparente et professionnelle de copropriétés à Marrakech. Devis gratuit sous 48h.",
    images: [{ url: `${SITE_URL}/og-image.jpg` }],
  },
  twitter: {
    images: [`${SITE_URL}/og-image.jpg`],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Qu'est-ce qu'un syndic de copropriété à Marrakech ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Un syndic de copropriété est le mandataire chargé d'administrer une copropriété : gestion administrative, financière, technique et juridique, en conformité avec la loi marocaine 18-00 / 106-12.",
      },
    },
    {
      "@type": "Question",
      name: "Quels services propose ASOMOVIT SYNDIC ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ASOMOVIT SYNDIC assure la gestion administrative, financière et comptable, l'organisation des assemblées générales, le suivi des travaux, l'assistance juridique et l'entretien des parties communes de votre copropriété à Marrakech.",
      },
    },
    {
      "@type": "Question",
      name: "Comment obtenir un devis pour le syndic de ma résidence à Marrakech ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Contactez-nous via notre formulaire ou par téléphone. Nous étudions votre copropriété et vous transmettons une proposition claire et personnalisée sous 48 heures.",
      },
    },
    {
      "@type": "Question",
      name: "Quelle est la zone d'intervention d'ASOMOVIT SYNDIC ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nous intervenons sur l'ensemble de Marrakech et sa région : Guéliz, Hivernage, Targa, Agdal, Palmeraie, et les communes avoisinantes de la région Marrakech-Safi.",
      },
    },
  ],
};

const engagements = [
  {
    icon: ShieldCheck,
    title: "Conformité loi 18-00",
    desc: "Gestion transparente et conforme à la loi 18-00 / 106-12.",
  },
  {
    icon: Clock,
    title: "Réactivité 7j/7",
    desc: "Une équipe disponible pour répondre rapidement à vos urgences.",
  },
  {
    icon: ClipboardList,
    title: "Suivi complet",
    desc: "Suivi administratif, financier et technique de A à Z.",
  },
  {
    icon: MessageSquare,
    title: "Communication continue",
    desc: "Échange permanent avec les copropriétaires.",
  },
];

const reasons = [
  {
    icon: Award,
    title: "Expertise professionnelle",
    desc: "Une équipe qualifiée maîtrisant la législation et les règles de copropriété.",
  },
  {
    icon: Eye,
    title: "Transparence totale",
    desc: "Comptes détaillés et accès aux informations à tout moment.",
  },
  {
    icon: Users,
    title: "Proximité & disponibilité",
    desc: "Un syndic à l'écoute et présent sur le terrain.",
  },
  {
    icon: Settings2,
    title: "Gestion personnalisée",
    desc: "Des solutions adaptées aux besoins de chaque copropriété.",
  },
  {
    icon: Scale,
    title: "Respect de la loi",
    desc: "Application rigoureuse des obligations légales et réglementaires.",
  },
];

const services = [
  {
    icon: FileText,
    title: "Gestion administrative",
    desc: "Dossiers, règlement, contrats et exécution des décisions d'AG.",
  },
  {
    icon: Wallet,
    title: "Gestion financière & comptable",
    desc: "Budget, appels de fonds, comptes détaillés, suivi des impayés.",
  },
  {
    icon: Vote,
    title: "Assemblées générales",
    desc: "Convocations, animation, procès-verbaux et suivi des décisions.",
  },
  {
    icon: Hammer,
    title: "Suivi des travaux",
    desc: "Devis, prestataires, interventions et contrôle qualité.",
  },
  {
    icon: Scale,
    title: "Assistance juridique",
    desc: "Conseil en copropriété, conflits, conformité 18-00 / 106-12.",
  },
  {
    icon: Sparkles,
    title: "Entretien parties communes",
    desc: "Nettoyage, espaces verts et maintenance courante.",
  },
];

const method = [
  {
    n: "01",
    title: "Analyse de votre copropriété",
    desc: "Étude administrative, financière et technique.",
  },
  {
    n: "02",
    title: "Proposition claire",
    desc: "Une offre de gestion adaptée à vos besoins réels.",
  },
  {
    n: "03",
    title: "Prise en charge complète",
    desc: "Gestion quotidienne et suivi permanent.",
  },
  {
    n: "04",
    title: "Contrôle & communication",
    desc: "Reporting régulier et transparence totale.",
  },
];

const residences = [
  { name: "Appel Garden T1", img: resAppel },
  { name: "Riad des Oliviers", img: resOliviers },
  { name: "Résidence Yasmina", img: resYasmina },
  { name: "Résidence Warda", img: resWarda },
  { name: "Résidence Rayhana", img: resRayhana },
  { name: "Résidence Al Horiya", img: resHoriya },
];

const testimonials = [
  {
    name: "M. Karim B.",
    role: "Président, Résidence Yasmina",
    quote:
      "Depuis qu'ASOMOVIT gère notre copropriété, tout est plus clair : les comptes, la communication, le suivi des travaux. Une vraie tranquillité d'esprit.",
  },
  {
    name: "Mme Salma E.",
    role: "Copropriétaire, Riad des Oliviers",
    quote:
      "Une équipe disponible et professionnelle. Les assemblées générales sont enfin organisées dans le respect des règles et avec transparence.",
  },
  {
    name: "M. Youssef A.",
    role: "Président, Résidence Warda",
    quote: "Réactivité et sérieux au rendez-vous. Le syndic que nous attendions à Marrakech.",
  },
];

const faqs = [
  {
    q: "Qu'est-ce qu'un syndic de copropriété à Marrakech ?",
    a: "Un syndic de copropriété est le mandataire chargé d'administrer une copropriété : gestion administrative, financière, technique et juridique, en conformité avec la loi marocaine 18-00 / 106-12.",
  },
  {
    q: "Quels services propose ASOMOVIT SYNDIC ?",
    a: "Gestion administrative, financière et comptable, organisation des assemblées générales, suivi des travaux, assistance juridique et entretien des parties communes de votre copropriété à Marrakech.",
  },
  {
    q: "Comment obtenir un devis pour le syndic de ma résidence à Marrakech ?",
    a: "Contactez-nous via notre formulaire ou par téléphone. Nous étudions votre copropriété et vous transmettons une proposition claire et personnalisée sous 48 heures.",
  },
  {
    q: "Quelle est la zone d'intervention d'ASOMOVIT SYNDIC ?",
    a: "Nous intervenons sur l'ensemble de Marrakech et sa région : Guéliz, Hivernage, Targa, Agdal, Palmeraie, et les communes avoisinantes de la région Marrakech-Safi.",
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        >
          <source src="/hero-marrakech.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="container mx-auto px-4 py-24 md:py-36 lg:py-44">
          <div className="max-w-3xl text-white">
            <h1
              className="reveal font-heading text-4xl font-bold leading-tight md:text-6xl"
              style={{ animationDelay: "0ms" }}
            >
              Syndic de copropriété à <span className="text-white">Marrakech</span> — gestion
              transparente &amp; sereine
            </h1>
            <p
              className="reveal mt-5 max-w-2xl text-lg text-white/90 md:text-xl"
              style={{ animationDelay: "150ms" }}
            >
              ASOMOVIT SYNDIC accompagne les copropriétés de Marrakech : gestion administrative,
              financière, technique et juridique, en stricte conformité avec la loi 18-00 / 106-12.
            </p>
            <div className="reveal mt-8 flex flex-wrap gap-3" style={{ animationDelay: "300ms" }}>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-6 text-sm font-semibold text-accent-foreground transition hover:brightness-105"
                style={{
                  boxShadow:
                    "0 4px 14px -4px color-mix(in oklab, var(--brand-orange) 25%, transparent)",
                }}
              >
                Demander un devis gratuit <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
                style={{
                  boxShadow:
                    "0 4px 14px -4px color-mix(in oklab, var(--brand-blue-deep) 25%, transparent)",
                }}
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ENGAGEMENTS */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {engagements.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-accent group-hover:text-accent-foreground">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* POURQUOI NOUS */}
      <section className="bg-secondary/50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: "var(--orange-deep)" }}
            >
              Pourquoi nous choisir
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold md:text-4xl">
              Un partenaire de confiance pour votre copropriété
            </h2>
            <p className="mt-4 text-muted-foreground">
              Notre engagement : vous offrir une gestion sereine, transparente et durable.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reasons.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl bg-card p-6 shadow-[var(--shadow-card)]">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent/15 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES APERÇU */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: "var(--orange-warm)" }}
            >
              Nos services
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold md:text-4xl">
              Une prise en charge complète de votre copropriété
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center text-sm font-semibold text-primary hover:text-accent"
          >
            Voir tous les services <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-accent hover:shadow-[var(--shadow-card)]"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground transition group-hover:bg-accent group-hover:text-accent-foreground">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MÉTHODE */}
      <section
        className="py-20 text-primary-foreground"
        style={{
          background: "linear-gradient(135deg, var(--brand-blue-deep) 0%, var(--brand-blue) 100%)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: "var(--orange-bright)" }}
            >
              Notre méthode
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold md:text-4xl">
              4 étapes pour une gestion sans faille
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {method.map((s) => (
              <div
                key={s.n}
                className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <span className="font-heading text-4xl font-bold text-accent">{s.n}</span>
                <h3 className="mt-3 font-heading text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RÉSIDENCES */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="text-sm font-semibold uppercase tracking-wider"
            style={{ color: "var(--orange-amber)" }}
          >
            Ils nous font confiance
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold md:text-4xl">
            Résidences que nous gérons
          </h2>
          <p className="mt-4 text-muted-foreground">
            Une sélection de copropriétés à Marrakech accompagnées au quotidien par nos équipes.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {residences.map((r) => (
            <figure
              key={r.name}
              className="group relative overflow-hidden rounded-2xl shadow-[var(--shadow-card)]"
            >
              <Image
                src={r.img}
                alt={r.name}
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                width={600}
                height={256}
                loading="lazy"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent p-4 text-white">
                <p className="font-heading text-lg font-semibold">{r.name}</p>
                <p className="text-xs opacity-85">Marrakech</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section className="bg-secondary/50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: "var(--orange-soft)" }}
            >
              Avis clients
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold md:text-4xl">
              Ce que disent les copropriétaires
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <blockquote
                key={t.name}
                className="rounded-2xl bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <Quote className="h-7 w-7 text-accent" />
                <p className="mt-4 text-sm leading-relaxed text-foreground/90">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-5 border-t border-border pt-4">
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: "var(--orange-warm)" }}
            >
              Questions fréquentes
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold md:text-4xl">
              Tout savoir sur votre syndic à Marrakech
            </h2>
          </div>
          <Accordion
            type="single"
            collapsible
            className="mt-10 rounded-2xl border border-border bg-card"
          >
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`} className="px-6 last:border-b-0">
                <AccordionTrigger className="font-heading text-base font-semibold text-foreground hover:no-underline hover:text-accent py-5">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="container mx-auto px-4 pb-20">
        <div
          className="overflow-hidden rounded-3xl px-6 py-14 text-center text-accent-foreground shadow-[var(--shadow-soft)] md:px-12 md:py-20"
          style={{
            background:
              "linear-gradient(135deg, var(--brand-blue-deep) 0%, var(--brand-blue) 100%)",
          }}
        >
          <h2 className="mx-auto max-w-3xl font-heading text-3xl font-bold md:text-4xl">
            Confiez-nous la gestion de votre copropriété
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base opacity-90">
            Recevez un devis gratuit et personnalisé sous 48 heures.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-accent px-6 text-sm font-semibold text-accent-foreground transition hover:brightness-105"
            style={{
              boxShadow:
                "0 4px 14px -4px color-mix(in oklab, var(--brand-orange) 25%, transparent)",
            }}
          >
            Demander un devis gratuit <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
