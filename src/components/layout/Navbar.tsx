import { useEffect, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ShoppingBag } from "lucide-react";
import { navLinks } from "@/config/navigation";
import { useCart } from "@/context/CartContext";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useMediaQuery, useScrolled } from "@/hooks/useMediaQuery";
import { useScrollLock } from "@/hooks/useScrollLock";
import { formatRange, getTodayHours, isOpenNow } from "@/lib/hours";
import { scrollToSection } from "@/lib/scroll";
import { generalOrderMessage, whatsappLink } from "@/lib/whatsapp";
import { pluralize } from "@/lib/format";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";

const sectionIds = navLinks.map((l) => l.id);

export function Navbar() {
  const scrolled = useScrolled(24);
  const [open, setOpen] = useState(false);
  const { count, toggleCart, isOpen } = useCart();
  const active = useActiveSection(sectionIds);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useScrollLock(open);

  useEffect(() => {
    if (isDesktop) setOpen(false);
  }, [isDesktop]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  const handleCart = () => {
    setOpen(false);
    toggleCart();
  };

  const handleLogo = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!open) return;
    e.preventDefault();
    setOpen(false);
    scrollToSection("#accueil", { delay: 80 });
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500",
          solid ? "bg-cream-50/95 shadow-[0_1px_0_0_rgba(42,23,16,0.06)]" : "bg-transparent",
        )}
      >
        <nav
          aria-label="Navigation principale"
          className="container-x flex h-16 items-center justify-between gap-4 md:h-20"
        >
          <Logo onClick={handleLogo} />

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative block rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300",
                      isActive ? "text-terracotta-600" : "text-cocoa-800/80 hover:text-cocoa-900",
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-terracotta-500"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleCart}
              aria-label={`Ouvrir le panier, ${count} ${pluralize(count, "article")}`}
              aria-expanded={isOpen}
              className="relative grid size-11 place-items-center rounded-full bg-white text-cocoa-900 shadow-soft ring-1 ring-cocoa-900/5 transition-all duration-300 hover:-translate-y-0.5 hover:text-terracotta-600"
            >
              <ShoppingBag className="size-5" />
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 16 }}
                  className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-terracotta-500 px-1 text-[11px] font-bold text-white ring-2 ring-cream-50"
                >
                  {count}
                </motion.span>
              )}
            </button>

            <Button href="#menu" size="sm" className="hidden sm:inline-flex" iconRight={<ArrowRight />}>
              Commander
            </Button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              className="grid size-11 place-items-center rounded-full bg-white shadow-soft ring-1 ring-cocoa-900/5 lg:hidden"
            >
              <span className="relative block h-4 w-5" aria-hidden="true">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-0.5 w-5 rounded bg-cocoa-900 transition-all duration-300",
                    open && "top-[7px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-[7px] h-0.5 w-5 rounded bg-cocoa-900 transition-all duration-300",
                    open && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-[14px] h-0.5 w-5 rounded bg-cocoa-900 transition-all duration-300",
                    open && "top-[7px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && <MobileMenu active={active} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

function MobileMenu({ active, onClose }: { active: string; onClose: () => void }) {
  const today = getTodayHours();
  const open = isOpenNow();

  const handleLink = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onClose();
    scrollToSection(href, { delay: 80 });
  };

  return (
    <motion.div
      id="mobile-menu"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 bottom-0 top-16 z-[45] flex flex-col overflow-y-auto bg-cream-50 px-6 pb-8 pt-4 lg:hidden"
    >
      <ul className="flex flex-col gap-1">
        {navLinks.map((link, i) => (
          <motion.li
            key={link.id}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 + i * 0.05, duration: 0.35 }}
          >
            <a
              href={link.href}
              onClick={(e) => handleLink(e, link.href)}
              className={cn(
                "flex items-center justify-between rounded-2xl px-4 py-4 font-display text-2xl font-semibold transition-colors",
                active === link.id ? "bg-white text-terracotta-600 shadow-soft" : "text-cocoa-900 hover:bg-white",
              )}
            >
              {link.label}
              <ArrowUpRight className="size-5 text-terracotta-500" />
            </a>
          </motion.li>
        ))}
      </ul>

      <div className="mt-auto space-y-4 pt-8">
        <Button href={whatsappLink(generalOrderMessage)} variant="whatsapp" size="lg" full icon={<WhatsAppIcon />}>
          Commander sur WhatsApp
        </Button>
        <p className="text-center text-sm text-cocoa-700/70">
          <span
            className={cn(
              "mr-2 inline-block size-2 rounded-full align-middle",
              open ? "bg-forest-500" : "bg-terracotta-500",
            )}
          />
          {open ? "Ouvert" : "Fermé"} · Aujourd’hui {today ? formatRange(today) : "—"}
        </p>
        <SocialLinks className="justify-center" />
      </div>
    </motion.div>
  );
}
