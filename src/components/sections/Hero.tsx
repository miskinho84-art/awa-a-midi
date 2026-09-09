import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { restaurant } from "@/config/restaurant";
import { generalOrderMessage, whatsappLink } from "@/lib/whatsapp";
import { formatNumber } from "@/lib/format";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Stars } from "@/components/ui/Stars";
import { FloatingDecor } from "@/components/hero/FloatingDecor";
import { HeroVisual } from "@/components/hero/HeroVisual";

const headlineWords = restaurant.tagline.split(" ");
const highlighted = new Set(["rendez-vous"]);
const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const [clients, , rating] = restaurant.stats;

  const fadeUp = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease },
  });

  return (
    <section
      id="accueil"
      className="relative flex min-h-svh items-center overflow-hidden bg-cream-50 pb-16 pt-24 md:pb-20 md:pt-36"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(228,87,46,0.10),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(47,122,71,0.10),transparent_55%)]" />
        <div className="absolute inset-0 pattern-diamond opacity-[0.05]" />
        <div className="absolute -left-40 top-1/4 size-[30rem] rounded-full glow-terracotta-soft" />
        <div className="absolute -right-32 bottom-0 size-[26rem] rounded-full glow-forest" />
      </div>

      <FloatingDecor />

      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="text-center lg:text-left">
          <motion.span
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 rounded-full border border-terracotta-500/15 bg-white/85 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-terracotta-700 shadow-soft"
          >
            <Sparkles className="size-4 text-gold" />
            {restaurant.cuisine}
          </motion.span>

          <h1 className="mt-6 font-display text-[2.7rem] font-semibold leading-[1.04] tracking-tight text-cocoa-900 sm:text-6xl lg:text-[4.4rem] xl:text-[5rem]">
            <motion.span
              {...fadeUp(0.1)}
              className="mb-4 block font-sans text-sm font-extrabold uppercase tracking-[0.35em] text-terracotta-600 sm:text-base"
            >
              {restaurant.name}
            </motion.span>
            <span className="block">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  className={cn(
                    "mr-[0.26em] inline-block",
                    highlighted.has(word) && "text-gradient pr-[0.05em] italic",
                  )}
                  initial={reduce ? false : { opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.07, ease }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            {...fadeUp(0.75)}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cocoa-700/80 sm:text-lg lg:mx-0"
          >
            {restaurant.description}
          </motion.p>

          <motion.div
            {...fadeUp(0.9)}
            className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start"
          >
            <Button href="#menu" size="lg">
              Voir le menu
            </Button>
            <Button href={whatsappLink(generalOrderMessage)} variant="whatsapp" size="lg" icon={<WhatsAppIcon />}>
              Commander WhatsApp
            </Button>
          </motion.div>

          <motion.div
            {...fadeUp(1.05)}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 lg:justify-start"
          >
            <div className="flex items-center gap-3">
              <Stars rating={Number(rating?.value) || 4.9} />
              <span className="text-sm font-semibold text-cocoa-800">
                {rating?.value}
                {rating?.suffix} / 5
              </span>
            </div>
            <div className="text-sm text-cocoa-700/70">
              <strong className="text-cocoa-900">{formatNumber(Number(clients?.value) || 0)}+</strong> clients
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease }}
          className="relative"
        >
          <HeroVisual />
        </motion.div>
      </div>

      <a
        href="#menu"
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-xs font-semibold uppercase tracking-widest text-cocoa-700/50 transition hover:text-terracotta-600"
      >
        <span>Découvrir</span>
        <ChevronDown className="size-5 animate-bounce" />
      </a>
    </section>
  );
}
