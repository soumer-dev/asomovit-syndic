import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import heroBg from "@/assets/hero-bg.webp";
import { Eye, Award, HeartHandshake, ShieldCheck, Scale, Briefcase, Calculator, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "À propos – ASOMOVIT SYNDIC, syndic à Marrakech",
  description:
    "Découvrez ASOMOVIT SYNDIC : société marocaine spécialisée dans la gestion de copropriétés à Marrakech. Notre mission, nos valeurs, notre équipe.",
  openGraph: {
    title: "À propos – ASOMOVIT SYNDIC",
    description:
      "Notre mission : assurer une gestion efficace, sereine et conforme à la loi 18-00 / 106-12.",
  },
};

const values = [
  {
    icon: Eye,
    title: "Transparence",
    desc: "Une gestion claire et compréhensible pour tous les copropriétaires.",
  },
  {
    icon: Award,
    title: "Professionnalisme",
    desc: "Expertise et rigueur au quotidien dans chaque dossier.",
  },
  {
    icon: HeartHandshake,
    title: "Disponibilité",
    desc: "Une équipe à l'écoute, présente et réactive.",
  },
  {
    icon: ShieldCheck,
    title: "Confiance",
    desc: "Une relation durable avec les copropriétaires.",
  },
  {
    icon: Scale,
    title: "Conformité légale",
    desc: "Respect strict de la loi 18-00 / 106-12.",
  },
];

const team = [
  {
    icon: Briefcase,
    role: "Gestion immobilière",
    desc: "Suivi administratif et relation copropriétaires.",
  },
  {
    icon: Calculator,
    role: "Comptabilité",
    desc: "Comptes, budgets, appels de fonds et reporting.",
  },
  {
    icon: Wrench,
    role: "Suivi technique",
    desc: "Travaux, prestataires et entretien des parties communes.",
  },
];

export default function AboutPage() {
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
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">À propos</p>
          <h1 className="mt-3 max-w-3xl font-heading text-4xl font-bold leading-tight md:text-5xl">
            Qui sommes-nous ?
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            ASOMOVIT SYNDIC est une société marocaine spécialisée dans la gestion de copropriétés à
            Marrakech. Notre objectif : vous garantir un cadre de vie serein, une gestion
            transparente et une communication permanente.
          </p>
        </div>
      </section>

      <section className="container mx-auto grid gap-10 px-4 py-20 lg:grid-cols-2 lg:gap-16">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Notre histoire</p>
          <h2 className="mt-2 font-heading text-2xl font-bold md:text-3xl">
            Une approche moderne du syndic
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Nous offrons une prise en charge complète, claire et organisée des copropriétés. Nous
            travaillons en toute impartialité pour défendre les intérêts de la copropriété et
            assurer une gestion durable et efficace, dans le strict respect du cadre légal marocain.
          </p>
        </div>

        <div className="rounded-2xl bg-primary p-8 text-primary-foreground shadow-[var(--shadow-soft)]">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Notre mission</p>
          <h2 className="mt-2 font-heading text-2xl font-bold md:text-3xl">
            Protéger et valoriser
          </h2>
          <p className="mt-4 leading-relaxed text-white/85">
            Assurer une gestion efficace et sereine des copropriétés en protégeant les intérêts
            collectifs, en valorisant le patrimoine immobilier et en garantissant le respect des
            obligations légales (loi 18-00 / 106-12).
          </p>
        </div>
      </section>

      <section className="bg-secondary/50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">Nos valeurs</p>
            <h2 className="mt-2 font-heading text-3xl font-bold md:text-4xl">
              Les principes qui guident notre travail
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl bg-card p-6 shadow-[var(--shadow-card)]">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Notre équipe</p>
          <h2 className="mt-2 font-heading text-3xl font-bold md:text-4xl">
            Des professionnels engagés à vos côtés
          </h2>
          <p className="mt-4 text-muted-foreground">
            Notre équipe est composée de professionnels qualifiés en gestion immobilière,
            comptabilité et suivi technique.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {team.map(({ icon: Icon, role, desc }) => (
            <div
              key={role}
              className="rounded-2xl border border-border bg-card p-8 text-center shadow-[var(--shadow-card)]"
            >
              <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="mt-5 font-heading text-lg font-semibold">{role}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-7 text-sm font-semibold text-accent-foreground shadow-lg transition hover:brightness-105"
          >
            Discuter de votre copropriété
          </Link>
        </div>
      </section>
    </div>
  );
}
