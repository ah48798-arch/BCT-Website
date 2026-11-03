"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BctLogo } from "@/components/BctLogo";
import { companyData } from "@/data/company";
import {
  Volume2,
  VolumeX,
  RotateCcw,
  ArrowLeft,
  Sparkles,
  MessageCircle,
  Award,
} from "lucide-react";

interface StepOption {
  label: string;
  value: string;
  desc?: string;
}

export default function StartExperiencePage() {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // 0: Start, 1: Certificate, 2: Major, 3: Percentage, 4: Result
  const [mood, setMood] = useState<"idle" | "happy" | "talk" | "thinking">("idle");
  const [soundEnabled, setSoundEnabled] = useState(true);

  // User selections
  const [selectedCert, setSelectedCert] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("");
  const [selectedScore, setSelectedScore] = useState("");

  // History log of conversation
  const [chatLog, setChatLog] = useState<{ sender: "bot" | "user"; text: string }[]>([]);

  // Support direct step preview via URL (e.g. /start?step=2)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const p = new URLSearchParams(window.location.search);
      const step = p.get("step");
      if (step === "2") {
        setStarted(true);
        setCurrentStep(2);
        setSelectedCert("الشهادة الثانوية السودانية");
        setChatLog([
          {
            sender: "bot",
            text: "أهلاً بك! أنا مستشارك الذكي في شركة بشدار للاستشارات والتدريب (BCT) 🎓",
          },
          { sender: "user", text: "الشهادة الثانوية السودانية" },
          {
            sender: "bot",
            text: "ممتاز! اختر التخصص أو الكلية التي ترغب بدراستها في مصر من بين جميع التخصصات المعتمدة:",
          },
        ]);
      }
    }
  }, []);

  // Web Audio Synthesizer for retro CRT sound effects
  const playBeep = (freq = 600, duration = 0.1, type: OscillatorType = "sine") => {
    if (!soundEnabled) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio muted or unsupported safely
    }
  };

  const handleStartClick = () => {
    playBeep(520, 0.2);
    setStarted(true);
    setMood("happy");
    setTimeout(() => {
      setMood("talk");
      setChatLog([
        {
          sender: "bot",
          text: "أهلاً بك! أنا مستشارك الذكي في شركة بشدار للاستشارات والتدريب (BCT) 🎓",
        },
        {
          sender: "bot",
          text: "خلنا نحدد فرصتك الأكاديمية بدقة في الجامعات المصرية الحكومية.. ما نوع شهادتك الثانوية؟",
        },
      ]);
      setCurrentStep(1);
    }, 500);
  };

  const handleSelectCert = (val: string) => {
    playBeep(650, 0.12);
    setSelectedCert(val);
    setChatLog((prev) => [
      ...prev,
      { sender: "user", text: val },
      { sender: "bot", text: "ممتاز! اختر التخصص أو الكلية التي ترغب بدراستها في مصر من بين جميع التخصصات المعتمدة:" },
    ]);
    setMood("happy");
    setTimeout(() => setMood("idle"), 400);
    setCurrentStep(2);
  };

  const handleSelectMajor = (val: string) => {
    playBeep(720, 0.12);
    setSelectedMajor(val);
    setChatLog((prev) => [
      ...prev,
      { sender: "user", text: val },
      { sender: "bot", text: "اختيار متميز! ما نسبتك المئوية في الثانوية (المعادلة أو التقديرية)؟" },
    ]);
    setMood("happy");
    setTimeout(() => setMood("idle"), 400);
    setCurrentStep(3);
  };

  const handleSelectScore = (val: string) => {
    playBeep(880, 0.25);
    setSelectedScore(val);
    setMood("thinking");
    setChatLog((prev) => [
      ...prev,
      { sender: "user", text: val },
      { sender: "bot", text: "جاري تحليل المقاعد ونسب التنسيق المعتمدة لكليات القمة والجامعات المصرية..." },
    ]);

    setTimeout(() => {
      setMood("happy");
      setCurrentStep(4);
    }, 800);
  };

  const handleRestart = () => {
    playBeep(400, 0.15);
    setStarted(false);
    setCurrentStep(0);
    setMood("idle");
    setSelectedCert("");
    setSelectedMajor("");
    setSelectedScore("");
    setChatLog([]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "Enter" || e.key === " ") && !started) {
        e.preventDefault();
        handleStartClick();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [started]);

  // Options Data: Comprehensive Certificates
  const certOptions: StepOption[] = [
    { label: "الشهادة الثانوية السودانية (حديثة / مؤجلة)", value: "الشهادة السودانية" },
    { label: "الشهادة الثانوية السعودية (مسارات / مقررات)", value: "الشهادة السعودية" },
    { label: "شهادات عربية وخليجية (إمارات، كويت، قطر، عمان...)", value: "شهادات عربية وخليجية" },
    { label: "الشهادة البريطانية IGCSE / الدولية", value: "الشهادة البريطانية IGCSE" },
    { label: "الدبلومة الأمريكية American High School Diploma", value: "الدبلومة الأمريكية" },
    { label: "شهادة البكالوريوس (دراسات عليا / ماجستير ودكتوراه)", value: "دراسات عليا" },
  ];

  // Options Data: Complete Comprehensive Majors / الرغبات
  const majorOptions: StepOption[] = [
    { label: "الطب البشري والجراحة", value: "الطب البشري والجراحة" },
    { label: "طب وجراحة الفم والأسنان", value: "طب وجراحة الفم والأسنان" },
    { label: "الصيدلة (فارم دي / إكلينيكية)", value: "الصيدلة" },
    { label: "العلاج الطبيعي والتأهيل الصحي", value: "العلاج الطبيعي" },
    { label: "الهندسة (عمارة، مدني، ميكانيكا، كهرباء)", value: "الهندسة بمختلف فروعها" },
    { label: "الحاسبات والذكاء الاصطناعي ونظم المعلومات", value: "الحاسبات والذكاء الاصطناعي" },
    { label: "التمريض وتكنولوجيا العلوم الصحية", value: "التمريض والعلوم الصحية" },
    { label: "الطب البيطري والإنتاج الحيواني", value: "الطب البيطري" },
    { label: "الاقتصاد والعلوم السياسية وإدارة الأعمال", value: "الاقتصاد وإدارة الأعمال" },
    { label: "الإعلام وفنون الاتصال الجماهيري", value: "الإعلام والاتصال" },
    { label: "الألسن واللغات والترجمة الفورية", value: "الألسن واللغات" },
    { label: "الحقوق والشريعة والقانون", value: "الحقوق والقانون" },
    { label: "الفنون الجميلة والتطبيقية والتصميم", value: "الفنون والتصميم" },
    { label: "العلوم الأساسية والزراعة واستصلاح الأراضي", value: "العلوم والزراعة" },
    { label: "الآداب والتربية والعلوم الإنسانية والاجتماعية", value: "الآداب والتربية" },
  ];

  // Options Data: Score brackets
  const scoreOptions: StepOption[] = [
    { label: "75% فأكثر (مؤهل لكليات القمة بالجامعات الكبرى)", value: "75% فأكثر" },
    { label: "70% إلى 74.9% (مؤهل للطب الإقليمي وطب الأسنان)", value: "70% - 74.9%" },
    { label: "65% إلى 69.9% (مؤهل للصيدلة والعلاج الطبيعي والهندسة)", value: "65% - 69.9%" },
    { label: "55% إلى 64.9% (مؤهل للحاسبات والذكاء الاصطناعي واللغات)", value: "55% - 64.9%" },
    { label: "50% إلى 54.9% (مؤهل للكليات النظرية والتجارة والحقوق والآداب)", value: "50% - 54.9%" },
  ];

  // Compute recommendation
  const getRecommendation = () => {
    const isSudanese = selectedCert.includes("السودانية");
    const isHigh = selectedScore.includes("75%");
    const isMid = selectedScore.includes("70%");

    let targetUnis = "جامعة القاهرة، عين شمس، الإسكندرية، المنصورة، أسيوط";
    let chanceDesc = `فرصة ممتازة للالتحاق بتخصص (${selectedMajor}) بأعرق الجامعات المصرية.`;

    if (!isHigh && isMid) {
      targetUnis = "جامعة الزقازيق، طنطا، بنها، المنيا، سوهاج، أسوان، قنا";
      chanceDesc = `مؤهل لتخصص (${selectedMajor}) في كليات الأقاليم والجامعات الحكومية بتخفيض الحد الأدنى.`;
    } else if (!isHigh && !isMid) {
      targetUnis = "كليات الهندسة، الحاسبات، الصيدلة، العلوم واللغات بمختلف المحافظات";
      chanceDesc = `فرص واعدة للقبول في تخصص (${selectedMajor}) والبرامج النوعية المتميزة.`;
    }

    return {
      targetUnis,
      chanceDesc,
      discountNote: isSudanese
        ? "تتمتع كطالب سوداني بخصم 70% من المصروفات الدراسية بالدولار طوال سنوات النجاح والانتظام."
        : "تطبق الرسوم الرسمية للوافدين المعتمدة من الإدارة المركزية لشئون الطلاب الوافدين بمصر.",
    };
  };

  const recommendation = getRecommendation();

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto min-h-screen flex flex-col justify-between select-none font-sans"
      style={{
        background:
          "linear-gradient(180deg, #7a6d5f 0%, #8d7e6e 25%, #998b7a 50%, #a39584 75%, #a79989 100%)",
      }}
    >
      {/* Top Header Bar */}
      <header className="relative z-30 w-full max-w-6xl mx-auto px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <BctLogo size="md" variant="white" showLink={false} />
        </div>

        <div className="flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2.5 rounded-full bg-[#132238]/60 text-white hover:bg-[#132238] transition-all border border-white/20 text-xs"
            title={soundEnabled ? "كتم الصوت" : "تشغيل الصوت"}
            aria-label="التحكم في الصوت"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#41E3D2]" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Return To Website Link */}
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold text-white bg-[#132238]/80 hover:bg-[#132238] border border-white/20 transition-all hover:scale-105 shadow-md"
          >
            <span>الرجوع للموقع</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Center Interactive Stage */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 py-4 max-w-4xl mx-auto w-full">
        {/* Retro CRT TV Character Screen (Stage) */}
        <div
          className={`relative transition-all duration-500 flex items-center justify-center ${
            !started
              ? "w-full max-w-[380px] sm:max-w-[420px] aspect-[4/3] mb-4"
              : "w-36 h-24 sm:w-44 sm:h-28 mb-3"
          }`}
        >
          {/* TV Outer Shell */}
          <div
            onClick={!started ? handleStartClick : undefined}
            className={`relative w-full h-full rounded-[28px] sm:rounded-[36px] p-4 flex flex-col items-center justify-center transition-all duration-500 shadow-2xl border-4 ${
              !started
                ? "cursor-pointer hover:scale-105 border-[#E8832A]/50 bg-[#121c24]"
                : "border-[#132238] bg-[#0d161c]"
            }`}
            style={{
              boxShadow: "inset 0 0 40px rgba(0,0,0,0.8), 0 16px 32px rgba(0,0,0,0.4)",
            }}
          >
            {/* Curved Scanline Overlay */}
            <div
              className="absolute inset-0 rounded-[24px] sm:rounded-[32px] pointer-events-none opacity-40"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, transparent 1px, transparent 3px)",
              }}
            />

            {/* Top CRT Corner Blinking Caption */}
            {!started && (
              <div className="absolute top-4 right-6 font-mono text-[12px] sm:text-sm font-bold text-[#41E3D2] tracking-wider animate-pulse">
                [اضغط] للبدء
              </div>
            )}

            {started && (
              <div className="absolute top-2 right-4 font-mono text-[10px] font-bold text-[#41E3D2]/80">
                مستشار BCT
              </div>
            )}

            {/* Glowing Cyan Animated Eyes */}
            <div className={`relative flex items-center justify-center my-auto ${started ? "gap-6" : "gap-12 sm:gap-14"}`}>
              {/* Left Eye */}
              <div
                className={`transition-all duration-300 ${
                  mood === "happy"
                    ? started ? "w-5 h-2.5 border-t-2 border-[#41E3D2] rounded-t-full" : "w-10 h-5 border-t-4 border-[#41E3D2] rounded-t-full shadow-[0_0_15px_#41E3D2]"
                    : started ? "w-4 h-4 rounded-xs rotate-45 bg-[#41E3D2] shadow-[0_0_10px_#41E3D2]" : "w-8 h-8 rounded-sm rotate-45 bg-[#41E3D2] shadow-[0_0_20px_#41E3D2]"
                }`}
                style={{
                  animation: mood === "idle" ? "hjBlink 5s infinite" : "none",
                }}
              />

              {/* Right Eye */}
              <div
                className={`transition-all duration-300 ${
                  mood === "happy"
                    ? started ? "w-5 h-2.5 border-t-2 border-[#41E3D2] rounded-t-full" : "w-10 h-5 border-t-4 border-[#41E3D2] rounded-t-full shadow-[0_0_15px_#41E3D2]"
                    : started ? "w-4 h-4 rounded-xs rotate-45 bg-[#41E3D2] shadow-[0_0_10px_#41E3D2]" : "w-8 h-8 rounded-sm rotate-45 bg-[#41E3D2] shadow-[0_0_20px_#41E3D2]"
                }`}
                style={{
                  animation: mood === "idle" ? "hjBlink 5s infinite" : "none",
                }}
              />
            </div>

            {/* Subtle Speaker Grill Dots */}
            <div className={`absolute bottom-2 flex items-center gap-1.5`}>
              {[...Array(6)].map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    i < currentStep ? "bg-[#41E3D2]" : "bg-slate-700"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Start Hint Indicator (before click) */}
        {!started && (
          <div
            onClick={handleStartClick}
            className="cursor-pointer text-center space-y-2 animate-bounce mt-2"
          >
            <p className="text-base sm:text-lg font-bold text-white tracking-wide drop-shadow-md">
              اضغط على الشاشة… وخلنا نبدأ ←
            </p>
            <p className="text-xs text-white/80 font-mono">
              أو اضغط على زر <kbd className="px-2 py-0.5 rounded bg-black/40 border border-white/30 text-white font-mono">Enter</kbd>
            </p>
          </div>
        )}

        {/* Interactive Chat Dialog & Choice Buttons (after click) */}
        {started && (
          <div className="w-full max-w-2xl bg-[#132238]/95 backdrop-blur-md border border-white/20 p-4 sm:p-6 rounded-3xl shadow-2xl text-right animate-in fade-in duration-300 flex flex-col max-h-[78vh] overflow-hidden">
            {/* Conversation Log Preview */}
            <div className="space-y-2 mb-3 max-h-28 overflow-y-auto text-xs sm:text-sm pr-1 custom-scrollbar flex-shrink-0">
              {chatLog.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 sm:p-3 rounded-2xl leading-relaxed ${
                    item.sender === "bot"
                      ? "bg-white/10 text-white border border-white/10"
                      : "bg-[#E8832A] text-white font-bold ml-auto max-w-[85%]"
                  }`}
                >
                  {item.text}
                </div>
              ))}
            </div>

            {/* Step 1 Options: Certificate */}
            {currentStep === 1 && (
              <div className="space-y-2 pt-1 flex-1 flex flex-col min-h-0">
                <p className="text-xs font-bold text-[#E8832A] mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>اختر نوع شهادتك الثانوية:</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 overflow-y-auto max-h-[48vh] pr-1.5 custom-scrollbar">
                  {certOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleSelectCert(opt.value)}
                      className="p-3 text-right text-xs sm:text-sm font-semibold rounded-xl bg-white/10 hover:bg-[#E8832A] text-white border border-white/15 hover:border-[#E8832A] transition-all hover:scale-[1.01] flex items-center justify-between gap-2 group min-h-[44px]"
                    >
                      <span>{opt.label}</span>
                      <span className="w-4 h-4 rounded-full bg-white/10 group-hover:bg-white/30 flex items-center justify-center text-[10px] flex-shrink-0">
                        ←
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2 Options: Major / الرغبات والتخصصات بالكامل */}
            {currentStep === 2 && (
              <div className="space-y-2 pt-1 flex-1 flex flex-col min-h-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-bold text-[#E8832A] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>اختر التخصص أو الكلية المطلوبة (كافة التخصصات متاحة):</span>
                  </p>
                  <span className="text-[11px] text-slate-300 font-mono">15 تخصصاً معتمداً</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 overflow-y-auto max-h-[48vh] pr-1.5 pl-0.5 custom-scrollbar">
                  {majorOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleSelectMajor(opt.value)}
                      className="p-3 text-right text-xs font-bold rounded-xl bg-white/10 hover:bg-[#E8832A] text-white border border-white/15 hover:border-[#E8832A] transition-all hover:scale-[1.01] flex items-center justify-between gap-2 group min-h-[44px]"
                    >
                      <span className="leading-tight">{opt.label}</span>
                      <span className="w-4 h-4 rounded-full bg-white/10 group-hover:bg-white/30 flex items-center justify-center text-[10px] flex-shrink-0">
                        ←
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3 Options: Score Range */}
            {currentStep === 3 && (
              <div className="space-y-2 pt-1 flex-1 flex flex-col min-h-0">
                <p className="text-xs font-bold text-[#E8832A] mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>اختر النسبة المئوية التقريبية:</span>
                </p>
                <div className="grid grid-cols-1 gap-2 overflow-y-auto max-h-[48vh] pr-1.5 custom-scrollbar">
                  {scoreOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleSelectScore(opt.value)}
                      className="p-3 text-right text-xs sm:text-sm font-semibold rounded-xl bg-white/10 hover:bg-[#E8832A] text-white border border-white/15 hover:border-[#E8832A] transition-all hover:scale-[1.01] flex items-center justify-between gap-2 group min-h-[44px]"
                    >
                      <span>{opt.label}</span>
                      <span className="w-4 h-4 rounded-full bg-white/10 group-hover:bg-white/30 flex items-center justify-center text-[10px] flex-shrink-0">
                        ←
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Final Recommendation Card */}
            {currentStep === 4 && (
              <div className="space-y-3 pt-1 text-right overflow-y-auto max-h-[55vh] pr-1 custom-scrollbar">
                <div className="p-4 rounded-2xl bg-white/10 border border-[#E8832A]/50 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#F5A623]">
                    <Award className="w-5 h-5 text-[#E8832A]" />
                    <span>النتيجة والترشيح الأكاديمي المقترح:</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-medium">
                    {recommendation.chanceDesc}
                  </p>

                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs space-y-1">
                    <span className="font-bold text-white block">الجامعات المستهدفة:</span>
                    <span className="text-[#41E3D2] font-semibold">{recommendation.targetUnis}</span>
                  </div>

                  <p className="text-xs text-[#F5A623] font-semibold">
                    {recommendation.discountNote}
                  </p>
                </div>

                {/* Final Actions */}
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <a
                    href={`https://wa.me/${companyData.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                      `السلام عليكم شركة بشدار، أكملت تجربة مستشار BCT الأكاديمي الذكي:
- نوع الشهادة: ${selectedCert}
- التخصص المطلوب: ${selectedMajor}
- النسبة التقديرية: ${selectedScore}
أود حجز مقعد وبدء إجراءات التقديم والتسجيل فوراً.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3.5 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#E8832A] to-[#FF654F] hover:opacity-95 text-xs sm:text-sm text-center shadow-lg transition-transform hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>تأكيد الترشيح ومراسلة المستشار واتساب</span>
                  </a>

                  <Link
                    href="/universities"
                    className="py-3 px-4 rounded-xl font-semibold text-white bg-white/15 hover:bg-white/25 text-xs text-center border border-white/20 transition-colors"
                  >
                    دليل الجامعات الكامل
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Bottom Footer Controls */}
      <footer className="relative z-30 w-full max-w-6xl mx-auto px-6 py-4 flex items-center justify-between text-xs text-white/70 flex-shrink-0">
        <div className="flex items-center gap-2">
          {started && (
            <button
              type="button"
              onClick={handleRestart}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ابدأ من جديد</span>
            </button>
          )}
        </div>

        <div className="text-center font-mono text-[11px]">
          شركة بشدار للاستشارات والتدريب • س.ت: {companyData.commercialReg}
        </div>
      </footer>
    </div>
  );
}
