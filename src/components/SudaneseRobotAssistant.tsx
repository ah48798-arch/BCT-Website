"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowLeft, X } from "lucide-react";

interface SudaneseRobotAssistantProps {
  className?: string;
}

export const SudaneseRobotAssistant: React.FC<SudaneseRobotAssistantProps> = ({
  className = "",
}) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);
  const [eyeState, setEyeState] = useState<"normal" | "happy" | "blink">("normal");

  // Eye blinking cycle
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setEyeState("blink");
      setTimeout(() => setEyeState("normal"), 220);
    }, 4500);

    return () => clearInterval(blinkInterval);
  }, []);

  const handleClick = () => {
    setEyeState("happy");
    router.push("/start");
  };

  return (
    <aside
      aria-label="المستشار الآلي الذكي لبشدار"
      className={`fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex flex-col items-start gap-2 select-none pointer-events-auto ${className}`}
    >
      {/* Speech Bubble / Tooltip stacked neatly ABOVE the robot character */}
      {!bubbleDismissed && (
        <div
          onClick={handleClick}
          className={`cursor-pointer group relative px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-white/95 backdrop-blur-md border border-[#132238]/10 shadow-[0_12px_28px_rgba(18,33,55,0.18)] transition-all duration-300 hover:scale-[1.02] hover:border-[#E8832A]/50 text-right w-[190px] sm:w-[210px] animate-in fade-in slide-in-from-bottom-2 ${
            isHovered ? "translate-y-[-3px] shadow-lg border-[#E8832A]" : ""
          }`}
        >
          {/* Close bubble button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setBubbleDismissed(true);
            }}
            aria-label="إغلاق التلميح"
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center text-[10px] transition-colors"
          >
            <X className="w-3 h-3" />
          </button>

          {/* Pointer tail pointing downward towards the robot head */}
          <div className="absolute -bottom-1.5 left-7 w-3 h-3 bg-white border-b border-r border-[#132238]/10 rotate-45" />

          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#E8832A] mb-0.5">
            <Sparkles className="w-3 h-3" />
            <span>مستشارك الأكاديمي</span>
          </div>

          <p className="text-xs font-black text-[#132238] leading-tight m-0">
            جاهز نبدأ رحلتك الجامعية؟ 🎓
          </p>

          <div className="mt-1.5 pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-[#31B7A6] group-hover:text-[#E8832A] transition-colors">
            <span>اضغط هنا للبدء</span>
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
          </div>
        </div>
      )}

      {/* Robot Character Button */}
      <div className="relative group">
        <button
          type="button"
          onClick={handleClick}
          onMouseEnter={() => {
            setIsHovered(true);
            setEyeState("happy");
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            setEyeState("normal");
          }}
          aria-label="ابدأ رحلتك الجامعية مع المستشار الذكي"
          className="relative block w-20 h-24 sm:w-24 sm:h-28 rounded-3xl bg-gradient-to-b from-[#a79989] via-[#948574] to-[#7d6e5d] p-1.5 shadow-[0_12px_30px_rgba(18,33,55,0.3)] hover:shadow-[0_16px_36px_rgba(232,131,42,0.4)] border-2 border-white/60 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#E8832A]/50 overflow-hidden cursor-pointer"
        >
          {/* Ambient Inner Halo */}
          <div className="absolute inset-0 bg-radial from-white/20 via-transparent to-black/30 pointer-events-none" />

          {/* Character SVG: Sudanese Robot in White Turban and Jalabiya */}
          <svg
            viewBox="0 0 160 190"
            className="w-full h-full drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Filter definitions */}
            <defs>
              <linearGradient id="jalabiyaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="65%" stopColor="#F4F4F6" />
                <stop offset="100%" stopColor="#E2E4E8" />
              </linearGradient>
              <linearGradient id="turbanGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#F9F9FB" />
                <stop offset="100%" stopColor="#E5E7EB" />
              </linearGradient>
              <linearGradient id="tvBezelGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FF9E44" />
                <stop offset="50%" stopColor="#E8832A" />
                <stop offset="100%" stopColor="#C96515" />
              </linearGradient>
              <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0B131D" />
                <stop offset="100%" stopColor="#162231" />
              </linearGradient>
              <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* --- BODY: White Sudanese Jalabiya (جلابية بيضاء ناصعة) --- */}
            <g id="jalabiya">
              {/* Shoulders and Robe */}
              <path
                d="M20 185 C22 145 42 135 60 132 L100 132 C118 135 138 145 140 185 Z"
                fill="url(#jalabiyaGrad)"
              />
              {/* Shoulder Shadows */}
              <path
                d="M20 185 C24 150 40 140 55 136 L50 185 Z"
                fill="#CBD5E1"
                opacity="0.35"
              />
              <path
                d="M140 185 C136 150 120 140 105 136 L110 185 Z"
                fill="#CBD5E1"
                opacity="0.35"
              />

              {/* Robot Tech Neck Joint */}
              <rect x="68" y="118" width="24" height="18" rx="4" fill="#1E293B" />
              <line x1="72" y1="124" x2="88" y2="124" stroke="#475569" strokeWidth="1.5" />
              <line x1="72" y1="128" x2="88" y2="128" stroke="#475569" strokeWidth="1.5" />

              {/* Jalabiya Collar Neckband (ياقة الجلابية السودانية) */}
              <path
                d="M58 132 C65 146 95 146 102 132 L100 130 C92 141 68 141 60 130 Z"
                fill="#E2E8F0"
                stroke="#CBD5E1"
                strokeWidth="1"
              />
              {/* Vertical Placket Stitching Line */}
              <line x1="80" y1="144" x2="80" y2="185" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 2" />
              {/* Small Jalabiya Pearl Buttons */}
              <circle cx="80" cy="154" r="2" fill="#E8832A" />
              <circle cx="80" cy="168" r="2" fill="#E8832A" />
            </g>

            {/* --- HEAD: Retro CRT TV Robot Monitor (وجه الروبوت بشاشة برتقالية) --- */}
            <g id="robot-tv-head">
              {/* TV Outer Housing Shell (Warm BCT Orange) */}
              <rect
                x="32"
                y="52"
                width="96"
                height="74"
                rx="20"
                fill="url(#tvBezelGrad)"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              {/* Inner CRT Screen Rim */}
              <rect
                x="40"
                y="58"
                width="80"
                height="56"
                rx="14"
                fill="url(#screenGrad)"
                stroke="#8A3F07"
                strokeWidth="2"
              />

              {/* CRT Scanline Overlay */}
              <line x1="42" y1="65" x2="118" y2="65" stroke="#FFFFFF" strokeOpacity="0.06" strokeWidth="1" />
              <line x1="42" y1="71" x2="118" y2="71" stroke="#FFFFFF" strokeOpacity="0.06" strokeWidth="1" />
              <line x1="42" y1="77" x2="118" y2="77" stroke="#FFFFFF" strokeOpacity="0.06" strokeWidth="1" />
              <line x1="42" y1="83" x2="118" y2="83" stroke="#FFFFFF" strokeOpacity="0.06" strokeWidth="1" />
              <line x1="42" y1="89" x2="118" y2="89" stroke="#FFFFFF" strokeOpacity="0.06" strokeWidth="1" />
              <line x1="42" y1="95" x2="118" y2="95" stroke="#FFFFFF" strokeOpacity="0.06" strokeWidth="1" />
              <line x1="42" y1="101" x2="118" y2="101" stroke="#FFFFFF" strokeOpacity="0.06" strokeWidth="1" />

              {/* CRT Glass Reflection Arc */}
              <path
                d="M44 62 C65 62 105 70 112 85"
                stroke="#FFFFFF"
                strokeOpacity="0.18"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* DIGITAL GLOWING CYAN EYES (عيون رقمية تركوازية مشعة) */}
              {eyeState === "blink" ? (
                // Blinking Eyes (Horizontal Bars)
                <g filter="url(#cyanGlow)">
                  <rect x="54" y="83" width="16" height="3" rx="1.5" fill="#41E3D2" />
                  <rect x="90" y="83" width="16" height="3" rx="1.5" fill="#41E3D2" />
                </g>
              ) : eyeState === "happy" ? (
                // Happy Smiling Arcs
                <g filter="url(#cyanGlow)">
                  <path
                    d="M52 87 C56 79 68 79 72 87"
                    stroke="#41E3D2"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M88 87 C92 79 104 79 108 87"
                    stroke="#41E3D2"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </g>
              ) : (
                // Normal Expressive Diamond Eyes (عينان معينيتان مشعتان مثل الفيديو المرجعي)
                <g filter="url(#cyanGlow)">
                  <rect
                    x="56"
                    y="78"
                    width="13"
                    height="13"
                    rx="2"
                    transform="rotate(45 62.5 84.5)"
                    fill="#41E3D2"
                  />
                  <rect
                    x="92"
                    y="78"
                    width="13"
                    height="13"
                    rx="2"
                    transform="rotate(45 98.5 84.5)"
                    fill="#41E3D2"
                  />
                </g>
              )}

              {/* Bottom Speaker Grille Dots */}
              <circle cx="65" cy="120" r="1.5" fill="#FFFFFF" fillOpacity="0.75" />
              <circle cx="71" cy="120" r="1.5" fill="#FFFFFF" fillOpacity="0.75" />
              <circle cx="77" cy="120" r="1.5" fill="#FFFFFF" fillOpacity="0.75" />
              <circle cx="83" cy="120" r="1.5" fill="#FFFFFF" fillOpacity="0.75" />
              <circle cx="89" cy="120" r="1.5" fill="#FFFFFF" fillOpacity="0.75" />
              <circle cx="95" cy="120" r="1.5" fill="#FFFFFF" fillOpacity="0.75" />
            </g>

            {/* --- HEADWEAR: Authentic White Sudanese Turban (عمامة سودانية بيضاء تقليدية) --- */}
            <g id="sudanese-turban">
              {/* Back Wrap Foundation */}
              <ellipse cx="80" cy="50" rx="48" ry="18" fill="url(#turbanGrad)" stroke="#E2E8F0" strokeWidth="1" />

              {/* Main Crown Volume (طبقات لفة العمامة السودانية) */}
              <path
                d="M32 54 C30 36 46 22 80 22 C114 22 130 36 128 54 C120 46 102 42 80 42 C58 42 40 46 32 54 Z"
                fill="url(#turbanGrad)"
              />
              {/* Turban Folds / Creases (ثنيات القماش البيضاء المنسدلة) */}
              <path
                d="M36 48 C55 36 105 36 124 48"
                stroke="#CBD5E1"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M44 40 C60 30 100 30 116 40"
                stroke="#E2E8F0"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />

              {/* Traditional Turban Drape / Tail (عذبة العمامة المنسدلة على الجانب) */}
              <path
                d="M120 48 C128 58 135 78 134 110 C133 130 128 148 126 156 C124 156 122 144 122 125 C122 100 118 70 114 56 Z"
                fill="url(#turbanGrad)"
                stroke="#CBD5E1"
                strokeWidth="1"
              />
              {/* Left Side Subtle Turban Wrap */}
              <path
                d="M40 48 C32 58 28 72 28 92 C28 108 30 122 32 130 C30 125 32 105 34 90 C36 75 38 60 42 52 Z"
                fill="url(#turbanGrad)"
                opacity="0.85"
              />
            </g>
          </svg>
        </button>

        {/* Pulsing Signal Dot */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8832A] opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#E8832A] border-2 border-white" />
        </span>
      </div>
    </aside>
  );
};
