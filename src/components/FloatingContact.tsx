import { Phone } from "lucide-react";

const WHATSAPP_NUMBER = "212661901209";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Bonjour ASOMOVIT SYNDIC, je souhaite obtenir des informations sur vos services.",
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="white"
      aria-hidden="true"
      className={className}
    >
      <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.476 2.027 7.782L0 32l8.418-2.004A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.77-1.852l-.485-.288-5.003 1.191 1.215-4.872-.317-.5A13.267 13.267 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.878c-.398-.199-2.355-1.162-2.72-1.295-.365-.133-.63-.199-.896.199-.265.398-1.029 1.295-1.261 1.56-.232.265-.465.298-.863.1-.398-.199-1.681-.62-3.202-1.977-1.183-1.056-1.982-2.36-2.214-2.758-.232-.398-.025-.613.174-.811.179-.178.398-.465.597-.697.199-.232.265-.398.398-.664.133-.265.066-.497-.033-.697-.1-.199-.896-2.16-1.228-2.957-.323-.776-.651-.671-.896-.683l-.763-.013c-.265 0-.697.1-1.062.497-.365.398-1.394 1.362-1.394 3.322s1.427 3.854 1.626 4.12c.199.265 2.808 4.287 6.803 6.014.951.41 1.693.655 2.271.839.954.304 1.823.261 2.51.158.766-.114 2.355-.963 2.688-1.893.332-.93.332-1.727.232-1.893-.099-.166-.365-.265-.763-.464z" />
    </svg>
  );
}

// Shared button classes for both buttons
const btnBase =
  "group relative inline-flex h-11 w-11 items-center justify-center rounded-full shadow-md transition-all duration-300 ease-out hover:scale-110 hover:shadow-xl";

export function FloatingContact() {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2.5 sm:bottom-5 sm:right-5">
      {/* WhatsApp */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter sur WhatsApp"
        className={`${btnBase} bg-[#25D366] hover:shadow-[#25D366]/50`}
      >
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-40 group-hover:opacity-0 motion-reduce:hidden" />
        <WhatsAppIcon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
      </a>

      {/* Phone */}
      <a
        href="tel:+212661901209"
        aria-label="Appeler ASOMOVIT SYNDIC"
        className={`${btnBase} bg-accent text-accent-foreground hover:shadow-accent/40`}
      >
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-accent opacity-40 group-hover:opacity-0 motion-reduce:hidden" />
        <Phone className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
      </a>
    </div>
  );
}
