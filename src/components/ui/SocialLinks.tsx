import { restaurant } from "@/config/restaurant";
import { contactMessage, whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/utils/cn";
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from "./Icons";

const socials = [
  { name: "Instagram", href: restaurant.socials.instagram, Icon: InstagramIcon },
  { name: "Facebook", href: restaurant.socials.facebook, Icon: FacebookIcon },
  { name: "TikTok", href: restaurant.socials.tiktok, Icon: TikTokIcon },
  { name: "WhatsApp", href: whatsappLink(contactMessage), Icon: WhatsAppIcon },
];

interface SocialLinksProps {
  variant?: "light" | "dark";
  className?: string;
}

export function SocialLinks({ variant = "light", className }: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center gap-2", className)} aria-label="Réseaux sociaux">
      {socials.map(({ name, href, Icon }) => (
        <li key={name}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            title={name}
            className={cn(
              "grid size-11 place-items-center rounded-full transition-all duration-300 hover:-translate-y-0.5",
              variant === "light"
                ? "bg-white text-cocoa-800 shadow-soft ring-1 ring-cocoa-900/5 hover:bg-terracotta-500 hover:text-white"
                : "bg-white/10 text-cream-100 hover:bg-terracotta-500 hover:text-white",
            )}
          >
            <Icon className="size-5" />
          </a>
        </li>
      ))}
    </ul>
  );
}
