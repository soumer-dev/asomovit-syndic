"use client";

import { useState } from "react";
import { z } from "zod";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const quoteSchema = z.object({
  name: z.string().trim().min(2, "Nom trop court").max(100, "Nom trop long"),
  email: z.string().trim().email("Email invalide").max(255),
  phone: z.string().trim().min(6, "Téléphone invalide").max(30),
  residence_name: z.string().trim().max(150).optional().or(z.literal("")),
  lots_count: z.string().trim().max(20).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Message trop court (10 caractères min)").max(2000),
});

export function ContactForm() {
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
          {errors.message && (
            <p className="mt-1 text-xs text-destructive">{errors.message}</p>
          )}
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
