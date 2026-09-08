import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useScrolled } from "@/hooks/useMediaQuery";
import { generalOrderMessage, whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/Icons";

/** Bouton WhatsApp flottant : apparaît après le hero, aligné avec la barre panier mobile */
export function FloatingWhatsApp() {
  const show = useScrolled(480);
  const { isOpen } = useCart();

  return (
    <AnimatePresence>
      {show && !isOpen && (
        <motion.a
          key="floating-whatsapp"
          href={whatsappLink(generalOrderMessage)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Commander sur WhatsApp"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          className="group fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-40 flex h-14 items-center rounded-full bg-whatsapp text-white shadow-glow-green transition-colors duration-300 hover:bg-whatsapp-dark md:bottom-6 md:right-6"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 -z-10 rounded-full bg-whatsapp motion-safe:animate-pulse-ring"
          />
          <span className="grid size-14 shrink-0 place-items-center">
            <WhatsAppIcon className="size-7" />
          </span>
          <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-[13rem] group-hover:pr-5 group-focus-visible:max-w-[13rem] group-focus-visible:pr-5 md:block">
            Commander sur WhatsApp
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
