import { Star } from "lucide-react";
import { cn } from "@/utils/cn";

interface StarsProps {
  rating: number;
  size?: "sm" | "md";
  className?: string;
}

export function Stars({ rating, size = "md", className }: StarsProps) {
  const rounded = Math.round(rating);
  return (
    <span
      className={cn("inline-flex items-center gap-0.5 text-gold", className)}
      role="img"
      aria-label={`Note : ${rating} sur 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            size === "sm" ? "size-3.5" : "size-4.5",
            i < rounded ? "fill-current" : "fill-transparent text-cocoa-900/20",
          )}
        />
      ))}
    </span>
  );
}
