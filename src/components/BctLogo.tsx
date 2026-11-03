import React from "react";
import Link from "next/link";
import Image from "next/image";

interface BctLogoProps {
  className?: string;
  variant?: "default" | "white" | "badge";
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  showLink?: boolean;
}

export const BctLogo: React.FC<BctLogoProps> = ({
  className = "",
  variant = "default",
  size = "md",
  showLink = true,
}) => {
  // Controlled height preserving 1:1 aspect ratio without distorting
  const sizeClasses = {
    sm: "h-9 w-9",
    md: "h-12 w-12",
    lg: "h-16 w-16",
    xl: "h-20 w-20",
    hero: "h-28 w-28 md:h-36 md:w-36",
  };

  const isWhite = variant === "white";
  const isBadge = variant === "badge";

  const logoImage = (
    <div
      className={`relative inline-flex items-center justify-center select-none transition-transform duration-200 ${className} ${
        isBadge || isWhite
          ? "p-2 rounded-2xl bg-white shadow-sm border border-[#132238]/10"
          : ""
      }`}
    >
      <div className={`relative ${sizeClasses[size]} flex-shrink-0`}>
        <Image
          src="/bct-logo.png"
          alt="شركة بشدار للاستشارات والتدريب — BCT"
          fill
          sizes="(max-width: 768px) 120px, 180px"
          priority
          className="object-contain transition-all duration-300 drop-shadow-sm"
        />
      </div>
    </div>
  );

  if (showLink) {
    return (
      <Link
        href="/"
        aria-label="الرئيسية — شركة بشدار للاستشارات والتدريب"
        className="inline-flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#E8832A] rounded-xl"
      >
        {logoImage}
        <div className="flex flex-col text-right leading-tight">
          <span
            className={`font-black tracking-tight transition-colors ${
              isWhite
                ? "text-white group-hover:text-[#E8832A]"
                : "text-[#132238] group-hover:text-[#E8832A]"
            } ${size === "hero" ? "text-xl md:text-2xl" : "text-base md:text-lg"}`}
          >
            شركة بشدار
          </span>
          <span
            className={`text-[10px] md:text-xs font-semibold ${
              isWhite ? "text-[#31B7A6]" : "text-[#5B6878]"
            }`}
          >
            للاستشارات والتدريب | BCT
          </span>
        </div>
      </Link>
    );
  }

  return (
    <div className="inline-flex items-center gap-3">
      {logoImage}
      <div className="flex flex-col text-right leading-tight">
        <span
          className={`font-black tracking-tight ${
            isWhite ? "text-white" : "text-[#132238]"
          } ${size === "hero" ? "text-xl md:text-2xl" : "text-base md:text-lg"}`}
        >
          شركة بشدار
        </span>
        <span
          className={`text-[10px] md:text-xs font-semibold ${
            isWhite ? "text-[#31B7A6]" : "text-[#5B6878]"
          }`}
        >
          للاستشارات والتدريب | BCT
        </span>
      </div>
    </div>
  );
};
