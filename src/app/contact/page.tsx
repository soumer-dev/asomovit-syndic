import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact & Devis – ASOMOVIT SYNDIC à Marrakech",
  description:
    "Contactez ASOMOVIT SYNDIC à Marrakech. Demandez un devis gratuit pour la gestion de votre copropriété. Téléphone, email et formulaire en ligne.",
  openGraph: {
    title: "Contact & Devis – ASOMOVIT SYNDIC",
    description: "Demandez un devis gratuit pour la gestion de votre copropriété à Marrakech.",
  },
};

export default function ContactPage() {
  return (
    <div>
      <section className="bg-primary py-20 text-primary-foreground md:py-24">
        <div className="container mx-auto px-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Contact &amp; Devis
          </p>
          <h1 className="mt-3 max-w-3xl font-heading text-4xl font-bold leading-tight md:text-5xl">
            Parlons de votre copropriété
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            Vous souhaitez changer de syndic ou confier la gestion de votre copropriété à des
            professionnels compétents ? Notre équipe est à votre disposition.
          </p>
        </div>
      </section>

      <section className="container mx-auto grid gap-10 px-4 py-16 lg:grid-cols-5">
        {/* FORM */}
        <div className="lg:col-span-3">
          <ContactForm />
        </div>

        {/* COORDONNÉES */}
        <aside className="space-y-5 lg:col-span-2">
          <ContactCard icon={Phone} title="Téléphone">
            <a href="tel:+212661901209" className="font-semibold text-primary hover:text-accent">
              +212 661-901209
            </a>
          </ContactCard>
          <ContactCard icon={Mail} title="Email">
            <a
              href="mailto:direction@asomovitmultiservices.com"
              className="break-all font-medium text-primary hover:text-accent"
            >
              direction@asomovitmultiservices.com
            </a>
          </ContactCard>
          <ContactCard icon={MapPin} title="Adresse">
            <p className="text-sm text-foreground/85">Marrakech, Maroc</p>
          </ContactCard>
          <ContactCard icon={Clock} title="Horaires">
            <p className="text-sm text-foreground/85">Lundi – Vendredi : 9h00 – 18h00</p>
            <p className="text-sm text-foreground/85">Samedi : 9h00 – 13h00</p>
            <p className="mt-1 text-xs text-accent">Urgences : 7j/7</p>
          </ContactCard>
        </aside>
      </section>

      {/* GOOGLE MAPS */}
      <section className="container mx-auto px-4 pb-20">
        <div className="overflow-hidden rounded-2xl shadow-[var(--shadow-card)]">
          <iframe
            title="ASOMOVIT SYNDIC – Marrakech"
            src="https://www.google.com/maps?q=Marrakech,Morocco&output=embed"
            width="100%"
            height="420"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block w-full border-0"
          />
        </div>
      </section>
    </div>
  );
}

function ContactCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
      <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </p>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
}
