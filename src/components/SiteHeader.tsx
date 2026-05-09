"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/logo-asomovit.svg";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/services", label: "Services" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Add scroll shadow to header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70",
        "transition-shadow duration-300",
        scrolled && "header-scrolled",
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:h-20">
        <Link href="/" className="flex items-center gap-3" aria-label="ASOMOVIT SYNDIC – accueil">
          <Image src={logo} alt="ASOMOVIT SYNDIC" className="h-14 w-auto md:h-[70px]" height={80} />
          <span className="hidden font-heading text-lg font-bold leading-tight text-primary sm:inline-flex flex-col" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200",
                  active ? "text-primary" : "text-foreground/75 hover:text-primary",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="btn-lift ml-3 inline-flex h-10 items-center justify-center rounded-md bg-accent px-5 text-sm font-semibold text-accent-foreground shadow-sm"
          >
            Demander un devis
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-secondary lg:hidden"
        >
          <span
            className="transition-all duration-200"
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </span>
        </button>
      </div>

      {open && (
        <div className="mobile-menu-enter border-t border-border/60 bg-background lg:hidden">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="btn-lift mt-2 inline-flex h-11 items-center justify-center rounded-md bg-accent px-5 text-sm font-semibold text-accent-foreground"
            >
              Demander un devis
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
