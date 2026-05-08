import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Devis – ASOMOVIT SYNDIC à Marrakech" },
      {
        name: "description",
        content:
          "Contactez ASOMOVIT SYNDIC à Marrakech. Demandez un devis gratuit pour la gestion de votre copropriété. Téléphone, email et formulaire en ligne.",
      },
      { property: "og:title", content: "Contact & Devis – ASOMOVIT SYNDIC" },
      {
        property: "og:description",
        content: "Demandez un devis gratuit pour la gestion de votre copropriété à Marrakech.",
      },
    ],
  }),
  component: ContactPage,
});

const quoteSchema = z.object({
  name: z.string().trim().min(2, "Nom trop court").max(100, "Nom trop long"),
  email: z.string().trim().email("Email invalide").max(255),
  phone: z.string().trim().min(6, "Téléphone invalide").max(30),
  residence_name: z.string().trim().max(150).optional().or(z.literal("")),
  lots_count: z.string().trim().max(20).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Message trop court (10 caractères min)").max(2000),
});

function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const formData = new FormData(e.currentTarget);
    const raw = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      residence_name: String(formData.get("residence_name") ?? ""),
      lots_count: String(formData.get("lots_count") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    const parsed = quoteSchema.safeParse(raw);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const k = String(issue.path[0]);
        if (!errs[k]) errs[k] = issue.message;
      }
      setErrors(errs);
      toast.error("Veuillez corriger les erreurs du formulaire.");
      return;
    }

    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from("quote_requests" as never) as any).insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      residence_name: parsed.data.residence_name || null,
      lots_count: parsed.data.lots_count || null,
      message: parsed.data.message,
    });
    setLoading(false);

    if (error) {
      console.error(error);
      toast.error("Une erreur est survenue. Merci de réessayer ou de nous appeler.");
      return;
    }

    toast.success("Demande envoyée ! Nous vous recontactons sous 48h.");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <div>
      <section className="bg-primary py-20 text-primary-foreground md:py-24">
        <div className="container mx-auto px-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Contact & Devis</p>
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
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] md:p-8">
            <h2 className="font-heading text-2xl font-bold">Demande de devis gratuit</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Remplissez le formulaire — nous vous répondons sous 48 heures.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
              <Field label="Nom complet *" name="name" error={errors.name} />
              <Field label="Email *" name="email" type="email" error={errors.email} />
              <Field label="Téléphone *" name="phone" type="tel" error={errors.phone} />
              <Field label="Nom de la résidence" name="residence_name" error={errors.residence_name} />
              <Field
                label="Nombre de lots"
                name="lots_count"
                placeholder="ex : 24"
                error={errors.lots_count}
                className="md:col-span-2"
              />
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium">Votre message *</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                  placeholder="Parlez-nous brièvement de votre copropriété et de vos besoins…"
                />
                {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="md:col-span-2 inline-flex h-12 items-center justify-center rounded-md bg-accent px-7 text-sm font-semibold text-accent-foreground shadow-lg transition hover:brightness-105 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Envoi en cours…
                  </>
                ) : (
                  <>
                    Envoyer ma demande <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
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

function Field({
  label,
  name,
  type = "text",
  placeholder,
  error,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={label.includes("*")}
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
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
