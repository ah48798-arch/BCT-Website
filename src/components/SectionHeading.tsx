import React from "react";

interface SectionHeadingProps {
  badge?: string;
  tag?: string;
  title: string;
  description?: string;
  subtitle?: string;
  align?: "right" | "center";
  centered?: boolean;
  theme?: "light" | "dark";
  dark?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  tag,
  title,
  description,
  subtitle,
  align = "right",
  centered = false,
  theme = "light",
  dark = false,
  className = "",
}) => {
  const isDark = dark || theme === "dark";
  const isCenter = centered || align === "center";
  const displayBadge = badge || tag;
  const displayDescription = description || subtitle;

  return (
    <div
      className={`max-w-[760px] mb-8 ${
        isCenter ? "mx-auto text-center" : "text-right"
      } ${className}`}
    >
      {displayBadge && (
        <div
          className={`flex items-center gap-2.5 text-[#E8832A] text-[13px] font-bold ${
            isCenter ? "justify-center" : ""
          }`}
        >
          <span className="w-[22px] h-[2px] bg-[#E8832A] inline-block" />
          <span>{displayBadge}</span>
        </div>
      )}

      <h2
        className={`mt-3 text-[26px] sm:text-[32px] lg:text-[38px] font-bold leading-[1.4] tracking-tight ${
          isDark ? "text-white" : "text-[#132238]"
        }`}
      >
        {title}
      </h2>

      {displayDescription && (
        <p
          className={`mt-3 text-sm sm:text-base leading-[1.8] font-normal ${
            isDark ? "text-white/75" : "text-[#5B6878]"
          }`}
        >
          {displayDescription}
        </p>
      )}
    </div>
  );
};
