import { useId, type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface RotatingBadgeProps {
  text: string;
  className?: string;
  children?: ReactNode;
}

/** Badge circulaire avec texte tournant (style sticker premium) */
export function RotatingBadge({ text, className, children }: RotatingBadgeProps) {
  const id = useId();
  const pathId = `badge-path-${id.replace(/:/g, "")}`;
  return (
    <div className={cn("relative grid place-items-center rounded-full", className)} aria-hidden="true">
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full motion-safe:animate-spin-slow">
        <defs>
          <path id={pathId} d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <text className="fill-current text-[9.5px] font-bold uppercase tracking-[0.2em]">
          <textPath href={`#${pathId}`}>{text}</textPath>
        </text>
      </svg>
      <span className="relative">{children}</span>
    </div>
  );
}
