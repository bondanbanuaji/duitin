import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

interface LogoProps {
  variant?: "full" | "icon" | "text";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  priority?: boolean;
}

const sizeMap = {
  sm: { icon: 20, full: 24 },
  md: { icon: 28, full: 32 },
  lg: { icon: 40, full: 48 },
};

export function Logo({
  variant = "full",
  size = "md",
  href = "/dashboard",
  className,
  priority = false,
}: LogoProps) {
  const dimensions = sizeMap[size];

  const content = (
    <div
      className={cn(
        "flex items-center gap-2 group",
        className
      )}
      role="img"
      aria-label="Duitin Logo"
    >
      {(variant === "full" || variant === "icon") && (
        <Image
          src="/branding/logo.svg"
          alt="Duitin Logo"
          width={dimensions.icon}
          height={dimensions.icon}
          priority={priority}
          className="shrink-0"
        />
      )}
      {(variant === "full" || variant === "text") && (
        <span
          className={cn(
            "font-display font-bold tracking-tight text-[#E6EDF3] group-hover:text-white transition-colors select-none",
            size === "sm" && "text-sm",
            size === "md" && "text-lg",
            size === "lg" && "text-2xl"
          )}
        >
          DUITIN<span className="text-[#00E5C3]">.AI</span>
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="outline-none focus-visible:ring-2 focus-visible:ring-[#00E5C3] rounded-md">
        {content}
      </Link>
    );
  }

  return content;
}
