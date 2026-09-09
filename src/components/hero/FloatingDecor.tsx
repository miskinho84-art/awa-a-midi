import { ChiliIcon, LeafIcon, LimeSliceIcon } from "@/components/ui/Icons";
import { Floating } from "@/components/ui/Floating";

const particles = [
  { left: "6%", top: "28%", size: 6, color: "#e4572e", duration: 7, delay: 0 },
  { left: "12%", top: "72%", size: 4, color: "#e9b44c", duration: 9, delay: 2 },
  { left: "48%", top: "12%", size: 3, color: "#2f7a47", duration: 7.5, delay: 1.5 },
  { left: "58%", top: "88%", size: 5, color: "#e4572e", duration: 8.5, delay: 0.3 },
  { left: "66%", top: "20%", size: 4, color: "#f2a65a", duration: 6, delay: 2.4 },
  { left: "78%", top: "70%", size: 6, color: "#c9441f", duration: 7.2, delay: 0.9 },
  { left: "88%", top: "36%", size: 4, color: "#e9b44c", duration: 8.8, delay: 1.8 },
  { left: "93%", top: "82%", size: 3, color: "#2f7a47", duration: 6.8, delay: 0.4 },
  { left: "30%", top: "44%", size: 3, color: "#e4572e", duration: 9.5, delay: 2.8 },
  { left: "84%", top: "14%", size: 5, color: "#e4572e", duration: 7.8, delay: 1.1 },
];

/** Petits éléments flottants autour du hero — animations CSS pures, aucun coût JS */
export function FloatingDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <Floating className="left-[3%] top-[18%] hidden text-forest-500 md:block" duration={7} rotate={14}>
        <LeafIcon className="size-14" />
      </Floating>
      <Floating className="right-[4%] top-[16%] hidden md:block" duration={8} delay={1} rotate={-12}>
        <ChiliIcon className="size-12" />
      </Floating>
      <Floating className="bottom-[16%] left-[9%] hidden lg:block" duration={9} delay={0.5} rotate={18}>
        <LimeSliceIcon className="size-12" />
      </Floating>
      <Floating className="bottom-[10%] right-[10%] hidden text-forest-400 md:block" duration={6.5} delay={1.6} rotate={-18}>
        <LeafIcon className="size-9 -scale-x-100" />
      </Floating>
      <Floating className="right-[5%] top-[13%] text-forest-400 md:hidden" duration={7} delay={0.3} rotate={10}>
        <LeafIcon className="size-8 opacity-80" />
      </Floating>
      <Floating className="bottom-[6%] left-[4%] md:hidden" duration={8} delay={1.1} rotate={-10}>
        <ChiliIcon className="size-7 opacity-80" />
      </Floating>

      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full opacity-40 will-change-transform motion-safe:animate-drift"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
