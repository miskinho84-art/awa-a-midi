import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/utils/cn";

interface FloatingProps {
  className?: string;
  /** Durée du cycle en secondes */
  duration?: number;
  /** Décalage de départ en secondes */
  delay?: number;
  /** Rotation maximale en degrés */
  rotate?: number;
  children: ReactNode;
}

/** Élément décoratif en lévitation — animation CSS pure (compositeur GPU) */
export function Floating({ className, duration = 7, delay = 0, rotate = 10, children }: FloatingProps) {
  const style = {
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    "--float-rotate": `${rotate}deg`,
  } as CSSProperties;
  return (
    <div
      aria-hidden="true"
      className={cn("absolute will-change-transform motion-safe:animate-float-rotate", className)}
      style={style}
    >
      {children}
    </div>
  );
}
