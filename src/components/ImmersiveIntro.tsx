"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Sparkles, ArrowDown, Volume2, VolumeX } from "lucide-react";

interface ImmersiveIntroProps {
  onEnter: () => void;
}

export const ImmersiveIntro: React.FC<ImmersiveIntroProps> = ({ onEnter }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Audio synthesizer for welcoming cinematic chime
  const playChime = useCallback(() => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") ctx.resume();

      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(440, now);
      osc1.frequency.exponentialRampToValueAtTime(880, now + 0.35);

      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(554.37, now);
      osc2.frequency.exponentialRampToValueAtTime(1108.73, now + 0.45);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.7);
      osc2.stop(now + 0.7);
    } catch {
      // Audio autoplay policy fallback
    }
  }, [soundEnabled]);

  const handleStart = () => {
    playChime();
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 550);
  };

  // Keyboard shortcut: Space or Enter to trigger
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        handleStart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleStart]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="المقدمة التفاعلية لشركة بشدار"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-between px-6 py-8 md:py-12 bg-[#122137] text-white overflow-hidden transition-all duration-600 ease-out ${
        isExiting
          ? "opacity-0 scale-105 pointer-events-none filter blur-sm"
          : "opacity-100 scale-100"
      }`}
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 38%, rgba(18, 81, 106, 0.45) 0%, rgba(18, 33, 55, 0.96) 65%, #0B1524 100%)
        `,
      }}
    >
      {/* Animated Subtle Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Decorative Rotating Geometric Rings Container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <div className="relative w-[320px] h-[320px] sm:w-[560px] sm:h-[560px] md:w-[720px] md:h-[720px] flex-shrink-0">
          {/* Outer subtle ring */}
          <div className="absolute inset-0 rounded-full border border-white/10 animate-[spin_40s_linear_infinite]" />
          {/* Teal dotted ring */}
          <div className="absolute inset-10 rounded-full border border-dashed border-[#31B7A6]/30 animate-[spin_60s_linear_infinite_reverse]" />
          {/* Orange pulsing ring */}
          <div className="absolute inset-20 rounded-full border border-[#E8832A]/25 animate-pulse" />
          {/* Ambient Glow */}
          <div className="absolute inset-28 rounded-full bg-gradient-to-tr from-[#12516A]/30 to-[#E8832A]/20 filter blur-3xl" />
        </div>
      </div>

      {/* Top Bar: Brand Badge & Skip Intro */}
      <header className="relative z-10 w-full max-w-6xl flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold bg-white/10 border border-white/15 text-white backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8832A] animate-ping" />
            <span className="hidden sm:inline">شركة استشارات تعليمية مسجلة وموثقة</span>
            <span className="sm:hidden font-bold">بشدار للاستشارات</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            aria-label={soundEnabled ? "كتم المؤثرات الصوتية" : "تشغيل المؤثرات الصوتية"}
            className="p-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 transition-colors text-white/80 hover:text-white"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#31B7A6]" /> : <VolumeX className="w-3.5 h-3.5 text-white/50" />}
          </button>

          <button
            type="button"
            onClick={handleStart}
            className="text-[11px] sm:text-sm font-semibold px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white/90 hover:text-white transition-all backdrop-blur-md whitespace-nowrap"
          >
            تخطي ←
          </button>
        </div>
      </header>

      {/* Centerpiece: Official Logo & Oversized Headline */}
      <main className="relative z-10 flex flex-col items-center text-center max-w-3xl my-auto px-4">
        {/* Official BCT Logo in Ambient Emblem Shield */}
        <div className="relative mb-6 md:mb-8 group cursor-pointer" onClick={handleStart}>
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#12516A] via-[#E8832A]/40 to-[#31B7A6] opacity-40 blur-xl group-hover:opacity-75 transition-opacity duration-500" />
          <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-3xl bg-white border border-white/30 p-4 flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/bct-logo.png"
              alt="شركة بشدار للاستشارات والتدريب"
              fill
              sizes="160px"
              priority
              className="object-contain p-2 drop-shadow-sm"
            />
          </div>
        </div>

        {/* Brand Name Tagline */}
        <p className="text-sm md:text-base font-semibold tracking-wide text-[#31B7A6] mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#E8832A]" />
          <span>شركة بشدار للاستشارات والتدريب | BCT</span>
          <Sparkles className="w-4 h-4 text-[#E8832A]" />
        </p>

        {/* Oversized Arabic Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.25] text-white drop-shadow-md mb-4 md:mb-6">
          شريككم في النجاح
          <span className="block mt-1 bg-gradient-to-l from-[#E8832A] via-[#FFA858] to-[#31B7A6] bg-clip-text text-transparent">
            الأكاديمي والمهني
          </span>
        </h1>

        {/* Subtitle Positioning */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 font-normal max-w-2xl leading-relaxed mb-8 md:mb-10">
          دليلك المعتمد للالتحاق بأعرق الجامعات المصرية، وتوثيق ومعادلة الشهادات، وإنهاء كافة الإجراءات الرسمية بأعلى معايير الدقة والشفافية.
        </p>

        {/* Central Tactile Invitation Button: اضغط للبدء */}
        <div className="flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={handleStart}
            autoFocus
            className="group relative inline-flex items-center gap-3.5 px-8 md:px-10 py-4 md:py-4.5 rounded-full text-base md:text-lg font-black text-white bg-gradient-to-r from-[#E8832A] to-[#FF654F] shadow-[0_12px_36px_rgba(232,131,42,0.45)] hover:shadow-[0_16px_48px_rgba(232,131,42,0.65)] transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#E8832A]/50"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
            </span>
            <span>اضغط للبدء</span>
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-[-4px] transition-transform">
              ←
            </span>
          </button>

          <span className="text-xs text-white/50 tracking-wider font-mono">
            [ أو اضغط مفتاح Enter للبدء مباشرة ]
          </span>
        </div>
      </main>

      {/* Bottom Footer Details */}
      <footer className="relative z-10 w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 pt-4 border-t border-white/10 gap-2">
        <div className="flex items-center gap-4">
          <span>سجل تجاري: <strong className="text-white">226285</strong></span>
          <span>•</span>
          <span>بطاقة ضريبية: <strong className="text-white">274-135-760</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span>الدقي — الجيزة (بجوار سفارة السودان)</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#E8832A] animate-bounce" />
        </div>
      </footer>
    </div>
  );
};
