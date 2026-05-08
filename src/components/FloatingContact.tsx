import { Phone } from "lucide-react";
import Image from "next/image";
import whatsappIcon from "@/assets/whatsapp-icon.png";

export function FloatingContact() {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-3 sm:bottom-5 sm:right-5">
      <a
        href="https://wa.me/212661901209"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter sur WhatsApp"
        className="group relative inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-full shadow-lg ring-0 ring-[#25D366]/40 transition-all duration-300 ease-out hover:scale-110 hover:shadow-2xl hover:shadow-[#25D366]/50 hover:ring-8 sm:h-16 sm:w-16"
      >
        <span className="absolute inset-0 -z-10 rounded-full bg-[#25D366] opacity-60 animate-ping group-hover:opacity-0" />
        <Image
          src={whatsappIcon}
          alt="WhatsApp"
          width={64}
          height={64}
          loading="eager"
          draggable={false}
          className="relative block h-full w-full select-none rounded-full object-contain transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110"
        />
      </a>
      <a
        href="tel:+212661901209"
        aria-label="Appeler ASOMOVIT SYNDIC"
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition hover:scale-105 sm:h-16 sm:w-16"
      >
        <Phone className="h-6 w-6 sm:h-7 sm:w-7" />
      </a>
    </div>
  );
}
