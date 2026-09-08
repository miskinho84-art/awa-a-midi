import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/utils/cn";

interface QuantityStepperProps {
  name: string;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  className?: string;
}

export function QuantityStepper({
  name,
  quantity,
  onIncrement,
  onDecrement,
  min = 0,
  max = 20,
  size = "sm",
  className,
}: QuantityStepperProps) {
  const buttonClass = cn(
    "grid place-items-center rounded-full text-cocoa-800 transition hover:bg-cream-100 hover:text-terracotta-600 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-cocoa-800",
    size === "sm" ? "size-9" : "size-11",
  );
  const iconClass = size === "sm" ? "size-4" : "size-5";

  return (
    <div className={cn("inline-flex items-center rounded-full border border-cocoa-900/10 bg-white", className)}>
      <button
        type="button"
        onClick={onDecrement}
        disabled={quantity <= min}
        aria-label={`Diminuer la quantité de ${name}`}
        className={buttonClass}
      >
        <Minus className={iconClass} />
      </button>
      <motion.span
        key={quantity}
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
        className={cn(
          "text-center font-bold tabular-nums text-cocoa-900",
          size === "sm" ? "w-7 text-sm" : "w-9 text-base",
        )}
        aria-live="polite"
      >
        {quantity}
      </motion.span>
      <button
        type="button"
        onClick={onIncrement}
        disabled={quantity >= max}
        aria-label={`Augmenter la quantité de ${name}`}
        className={buttonClass}
      >
        <Plus className={iconClass} />
      </button>
    </div>
  );
}
