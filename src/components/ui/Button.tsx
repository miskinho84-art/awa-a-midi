import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

export type ButtonVariant =
  | "primary"
  | "whatsapp"
  | "secondary"
  | "outline"
  | "ghost"
  | "white"
  | "dark";
export type ButtonSize = "sm" | "md" | "lg";

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconRight?: ReactNode;
  full?: boolean;
  className?: string;
  children?: ReactNode;
}

type AnchorProps = CommonProps & { href: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "className" | "children"
  >;
type NativeProps = CommonProps & { href?: undefined } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children"
  >;

export type ButtonProps = AnchorProps | NativeProps;

const base =
  "group/btn relative inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-300 ease-out-expo active:scale-[0.97] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-terracotta-500/30 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-terracotta-500 text-white shadow-glow hover:-translate-y-0.5 hover:bg-terracotta-600 hover:shadow-lift",
  whatsapp:
    "bg-whatsapp text-white shadow-glow-green hover:-translate-y-0.5 hover:bg-whatsapp-dark",
  secondary:
    "bg-forest-700 text-white shadow-soft hover:-translate-y-0.5 hover:bg-forest-800",
  outline:
    "border-2 border-cocoa-900/10 bg-white/85 text-cocoa-900 hover:border-terracotta-500 hover:text-terracotta-600",
  ghost: "text-cocoa-800 hover:bg-cocoa-900/5",
  white:
    "bg-white text-terracotta-600 shadow-soft hover:-translate-y-0.5 hover:bg-cream-100",
  dark: "bg-cocoa-900 text-white shadow-soft hover:-translate-y-0.5 hover:bg-cocoa-800",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-sm sm:text-[15px]",
  lg: "h-13 px-7 text-base sm:h-14 sm:px-8",
};

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    icon,
    iconRight,
    full,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(base, variants[variant], sizes[size], full && "w-full", className);

  const content = (
    <>
      {icon && <span className="shrink-0 [&>svg]:size-5">{icon}</span>}
      {children && <span>{children}</span>}
      {iconRight && (
        <span className="shrink-0 transition-transform duration-300 group-hover/btn:translate-x-0.5 [&>svg]:size-5">
          {iconRight}
        </span>
      )}
    </>
  );

  if (typeof rest.href === "string") {
    const { href, target, rel, ...anchorRest } = rest as Omit<AnchorProps, keyof CommonProps>;
    const isHttp = /^https?:/i.test(href);
    return (
      <a
        href={href}
        target={target ?? (isHttp ? "_blank" : undefined)}
        rel={rel ?? (isHttp ? "noopener noreferrer" : undefined)}
        className={classes}
        {...anchorRest}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
