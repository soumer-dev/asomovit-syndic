import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import logo from "@/assets/logo-asomovit.png";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-primary text-primary-foreground">
      <div className="container mx-auto grid gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <Image
              src={logo}
              alt="ASOMOVIT SYNDIC"
              className="h-12 w-auto rounded-md bg-white p-1"
              height={48}
            />
            <div>
              <p className="font-heading text-lg font-bold">ASOMOVIT SYNDIC</p>
              <p className="text-xs opacity-80">Gestion de copropriété — Marrakech</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed opacity-85">
            Votre syndic de confiance à Marrakech. Gestion transparente, entretien complet et
            accompagnement personnalisé pour votre copropriété, dans le strict respect de la loi
            18-00 / 106-12.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="rounded-full bg-white/10 p-2 transition hover:bg-white/20"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="rounded-full bg-white/10 p-2 transition hover:bg-white/20"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="rounded-full bg-white/10 p-2 transition hover:bg-white/20"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wider">
            Liens rapides
          </h3>
          <ul className="mt-4 space-y-2 text-sm opacity-90">
            <li>
              <Link href="/" className="hover:text-accent">
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/a-propos" className="hover:text-accent">
                À propos
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-accent">
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-accent">
                Contact / Devis
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wider">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm opacity-90">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href="tel:+212661901209" className="hover:text-accent">
                +212 661-901209
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a
                href="mailto:direction@asomovitmultiservices.com"
                className="break-all hover:text-accent"
              >
                direction@asomovitmultiservices.com
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>Marrakech, Maroc</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-5 text-xs opacity-75 sm:flex-row">
          <p>© 2025 ASOMOVIT SYNDIC. Tous droits réservés.</p>
          <p className="flex gap-4">
            <a href="#" className="hover:text-accent">
              Mentions légales
            </a>
            <a href="#" className="hover:text-accent">
              Politique de confidentialité
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
