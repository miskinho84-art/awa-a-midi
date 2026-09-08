import type { MouseEvent } from "react";
import { restaurant } from "@/config/restaurant";
import { cn } from "@/utils/cn";

interface LogoProps {
  className?: string;
  light?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

export function Logo({ className, light = false, onClick }: LogoProps) {
  return (
    <a
      href="#accueil"
      onClick={onClick}
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label={`${restaurant.name} — Accueil`}
    >
      <span className="relative grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-terracotta-400 to-terracotta-600 text-white shadow-glow transition-transform duration-500 ease-spring group-hover:rotate-6 group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 12.5h16a8 8 0 0 1-16 0Z" fill="currentColor" stroke="none" />
          <path d="M9 4v3M12 3v4M15 4v3" opacity="0.9" />
          <path d="M8 20h8" />
        </svg>
      </span>
      <span
        className={cn(
          "font-display text-xl font-bold leading-none tracking-tight sm:text-2xl",
          light ? "text-white" : "text-cocoa-900",
        )}
      >
        AWA{" "}
        <em className={cn("font-medium italic", light ? "text-terracotta-300" : "text-terracotta-500")}>
          à Midi
        </em>
      </span>
    </a>
  );
}
