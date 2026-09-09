import { ChiliIcon, LeafIcon, LimeSliceIcon, TomatoIcon } from "@/components/ui/Icons";
import { Floating } from "@/components/ui/Floating";
import { cn } from "@/utils/cn";

/**
 * Scène "2.5D" légère : assiette flottante + ingrédients en lévitation (CSS uniquement).
 * Utilisée sur mobile/tablette, comme fallback sans WebGL et pendant le chargement de la 3D.
 */
export function HeroStatic({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      className={cn("absolute inset-0 transition-opacity duration-1000", hidden && "opacity-0")}
      aria-hidden={hidden || undefined}
    >
      <div className="absolute inset-0 grid place-items-center">
        <img
          src={"https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"}
          alt="Assiette de poulet braisé accompagné d’alloco, de salade fraîche et de sauce pimentée"
          width={768}
          height={768}
          fetchPriority="high"
          decoding="async"
          className="w-[76%] rounded-full object-cover shadow-lift will-change-transform motion-safe:animate-float"
        />
      </div>

      <Floating className="left-[2%] top-[22%] size-11 sm:size-14" duration={7} rotate={14}>
        <TomatoIcon className="size-full" />
      </Floating>
      <Floating className="right-0 top-[54%] size-12 sm:size-16" duration={8.5} delay={0.8} rotate={-18}>
        <LimeSliceIcon className="size-full" />
      </Floating>
      <Floating className="bottom-[8%] left-[10%] size-10 sm:size-14" duration={6.5} delay={1.4} rotate={-12}>
        <ChiliIcon className="size-full" />
      </Floating>
      <Floating className="right-[7%] top-[9%] size-9 text-forest-500 sm:size-12" duration={7.5} delay={0.4} rotate={20}>
        <LeafIcon className="size-full" />
      </Floating>
      <Floating className="left-[14%] top-[6%] size-6 text-forest-400 sm:size-8" duration={9} delay={2} rotate={-16}>
        <LeafIcon className="size-full -scale-x-100" />
      </Floating>
      <Floating className="bottom-[12%] right-[12%] size-7 sm:size-9" duration={8} delay={1} rotate={10}>
        <TomatoIcon className="size-full" />
      </Floating>
    </div>
  );
}
