import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { useRevealOnce } from "@/hooks/useRevealOnce";
import { cn } from "@/utils/cn";

type RevealTag = "div" | "li" | "article" | "section" | "span" | "figure";

interface RevealProps extends HTMLAttributes<HTMLElement> {
  as?: RevealTag;
  /** Délai en secondes */
  delay?: number;
  /** Décalage vertical initial en pixels */
  y?: number;
  children?: ReactNode;
}

/**
 * Apparition douce au défilement (fade + slide-up).
 * 100 % CSS (transitions sur opacity/transform) déclenchée par un IntersectionObserver partagé.
 * Respecte "prefers-reduced-motion".
 */
export function Reveal({ as = "div", delay = 0, y = 28, className, style, children, ...rest }: RevealProps) {
  const [ref, visible] = useRevealOnce<HTMLDivElement>();
  const Tag = as as "div";
  const revealStyle = {
    ...style,
    transitionDelay: delay ? `${delay}s` : undefined,
    "--reveal-y": `${y}px`,
  } as CSSProperties;

  return (
    <Tag ref={ref} className={cn("reveal", visible && "is-visible", className)} style={revealStyle} {...rest}>
      {children}
    </Tag>
  );
}
