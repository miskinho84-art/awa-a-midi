import { Flame, Leaf, Sparkles } from "lucide-react";
import type { DishBadge } from "@/data/menu";
import { cn } from "@/utils/cn";

const styles: Record<DishBadge, { className: string; Icon: typeof Flame }> = {
  Populaire: { className: "bg-terracotta-500 text-white", Icon: Flame },
  Nouveau: { className: "bg-forest-600 text-white", Icon: Sparkles },
  Végétarien: { className: "bg-forest-100 text-forest-800", Icon: Leaf },
};

export function DishBadgePill({ badge, className }: { badge: DishBadge; className?: string }) {
  const { className: badgeClass, Icon } = styles[badge];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold shadow-sm",
        badgeClass,
        className,
      )}
    >
      <Icon className="size-3.5" />
      {badge}
    </span>
  );
}
