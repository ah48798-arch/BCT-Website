"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ImmersiveIntro } from "@/components/ImmersiveIntro";
import { SectionHeading } from "@/components/SectionHeading";
import { companyData } from "@/data/company";
import { servicesData } from "@/data/services";
import { universitiesData } from "@/data/universities";
import { admissionWorkflow } from "@/data/admissions";
import { certificateRequirements } from "@/data/admissions";
import { faqData } from "@/data/guide";
import {
  GraduationCap,
  Building2,
  FileCheck,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  ChevronDown,
  Sparkles,
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  AlertTriangle,
  Award,
  BookOpen,
  DollarSign,
  Users,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(false);
  const [activeCert, setActiveCert] = useState(certificateRequirements[0]?.id || "sudan");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [uniFilter, setUniFilter] = useState<"all" | "major" | "regional">("all");
  const mainContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("intro") === "false" || urlParams.get("skipIntro") === "true") {
        const targetSection = urlParams.get("section");
        if (targetSection) {
          setTimeout(() => {
            const el = document.getElementById(targetSection);
            if (el) el.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
          }, 100);
        }
        return;
      }
      const seen = sessionStorage.getItem("bct_intro_completed");
      if (!seen) {
        setShowIntro(true);
      }
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem("bct_intro_completed", "true");
    setShowIntro(false);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
  };

  // GSAP Premium Motion Setup
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Support accessibility preferences
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Hero Entrance Timeline (triggers when intro is absent or completed)
      if (!showIntro) {
        const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

        heroTl
          .from(".hero-headline-item", {
            y: 35,
            opacity: 0,
            duration: 0.85,
            stagger: 0.15,
          })
          .from(
            ".hero-cta-item",
            {
              y: 20,
              opacity: 0,
              scale: 0.95,
              stagger: 0.12,
              duration: 0.6,
            },
            "-=0.4"
          )
          .from(
            ".hero-stat-item",
            {
              y: 20,
              opacity: 0,
              stagger: 0.1,
              duration: 0.55,
            },
            "-=0.3"
          )
          .from(
            ".hero-poster-card",
            {
              scale: 0.93,
              opacity: 0,
              duration: 1.0,
              ease: "power2.out",
            },
            "-=0.8"
          )
          .from(
            ".hero-floating-badge",
            {
              scale: 0.8,
              opacity: 0,
              stagger: 0.15,
              duration: 0.6,
            },
            "-=0.4"
          );
      }

      // 2. Scroll-Triggered Section Reveals
      const sections = [
        { id: "#about", selector: ".about-animate-item", stagger: 0.15 },
        { id: "#services", selector: ".service-card-item", stagger: 0.1 },
        { id: "#universities", selector: ".uni-card-item", stagger: 0.08 },
        { id: "#admissions", selector: ".admission-card-item", stagger: 0.08 },
        { id: "#requirements", selector: ".requirements-animate-item", stagger: 0.12 },
        { id: "#fees", selector: ".fees-animate-item", stagger: 0.12 },
        { id: "#faq", selector: ".faq-animate-item", stagger: 0.08 },
        { id: "#contact", selector: ".contact-animate-item", stagger: 0.15 },
      ];

      sections.forEach(({ id, selector, stagger }) => {
        const el = document.querySelector(id);
        if (el) {
          const targets = el.querySelectorAll(selector);
          if (targets.length > 0) {
            gsap.from(targets, {
              scrollTrigger: {
                trigger: el,
                start: "top 82%",
                toggleActions: "play none none none",
                once: true,
              },
              y: 35,
              opacity: 0,
              duration: 0.75,
              stagger: stagger,
              ease: "power2.out",
              clearProps: "all",
            });
          }
        }
      });
    }, mainContainerRef);

    return () => ctx.revert();
  }, [showIntro]);

  const selectedCert = certificateRequirements.find((c) => c.id === activeCert) || certificateRequirements[0];
  const filteredUniversities = universitiesData.filter((u) => {
    if (uniFilter === "all") return true;
    return u.tier === uniFilter;
  }).slice(0, 6);

  return (
    <>
      {/* PHASE 3: IMMERSIVE INTRO SCREEN */}
      {showIntro && <ImmersiveIntro onEnter={handleIntroComplete} />}

      {/* PHASE 4: HOMEPAGE MAIN CONTENT */}
      <div ref={mainContainerRef} className="relative min-h-screen bg-[#F6F3EE] text-[#132238] overflow-hidden">
        {/* ========================================================================= */}
        {/* HERO SECTION WITH AUTHENTIC BCT IMAGERY & CONCENTRIC GEOMETRIC RINGS      */}
        {/* ========================================================================= */}
        <section className="relative pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden border-b border-[#132238]/10">
          {/* Decorative Reference-Site Style Concentric Circles Container */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="hidden sm:block absolute -left-[200px] -top-[200px] w-[500px] h-[500px] rounded-full border border-[#31B7A6]/30" />
            <div className="hidden sm:block absolute -left-[100px] -top-[100px] w-[300px] h-[300px] rounded-full border border-dashed border-[#E8832A]/35" />
            <div className="hidden sm:block absolute -right-[150px] top-[40%] w-[420px] h-[420px] rounded-full border border-[#12516A]/15" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Text & Positioning Column (7 cols) */}
              <div className="lg:col-span-7 flex flex-col items-start text-right">
                <div className="hero-headline-item w-full">
                  <SectionHeading
                    tag="شركة بشدار للاستشارات والتدريب | BCT"
                    title="طريقك المعتمد للدراسة في أعرق الجامعات المصرية"
                    subtitle="مؤسسة استشارية رائدة متخصصة في توجيه ومرافقة الطلاب الوافدين وأبنائنا السودانيين للالتحاق بالجامعات الحكومية والخاصة مع إنهاء كافة إجراءات التوثيق والإقامة والموافقات الأمنية."
                    centered={false}
                  />
                </div>

                {/* Primary & Secondary Call To Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mt-8 w-full sm:w-auto">
                  <Link
                    href="/start"
                    className="hero-cta-item premium-btn inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-[#E8832A] to-[#FF654F] shadow-lg shadow-[#E8832A]/25 hover:shadow-xl text-center no-underline"
                  >
                    <span>ابدأ رحلتك الجامعية</span>
                    <ArrowLeft className="w-5 h-5" />
                  </Link>

                  <a
                    href="#universities"
                    className="hero-cta-item premium-btn inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-base font-bold text-[#132238] bg-white border border-[#132238]/15 hover:bg-slate-50 hover:border-[#132238]/30 no-underline shadow-sm text-center"
                  >
                    <Building2 className="w-5 h-5 text-[#12516A]" />
                    <span>استكشف الجامعات</span>
                  </a>
                </div>

                {/* Key Value Badges */}
                <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-10 pt-8 border-t border-[#132238]/10 w-full max-w-lg">
                  <div className="hero-stat-item">
                    <div className="text-2xl sm:text-3xl font-black text-[#132238]">26+</div>
                    <div className="text-xs sm:text-sm text-[#5B6878] font-semibold mt-0.5">جامعة حكومية</div>
                  </div>
                  <div className="hero-stat-item">
                    <div className="text-2xl sm:text-3xl font-black text-[#E8832A]">70%</div>
                    <div className="text-xs sm:text-sm text-[#5B6878] font-semibold mt-0.5">خصم الطلاب السودانيين</div>
                  </div>
                  <div className="hero-stat-item">
                    <div className="text-2xl sm:text-3xl font-black text-[#31B7A6]">100%</div>
                    <div className="text-xs sm:text-sm text-[#5B6878] font-semibold mt-0.5">سجل تجاري وقانوني</div>
                  </div>
                </div>
              </div>

              {/* Visual Composition Column (5 cols) with Authentic BCT Team Hero Poster */}
              <div className="lg:col-span-5 relative w-full overflow-hidden sm:overflow-visible">
                <div className="relative mx-auto w-full max-w-[360px] sm:max-w-md lg:max-w-none">
                  {/* Outer Ambient Glow */}
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#12516A]/25 via-[#E8832A]/20 to-[#31B7A6]/25 blur-2xl pointer-events-none" />

                  {/* Main Authentic BCT Team Poster Visual */}
                  <div className="hero-poster-card poster-frame relative rounded-3xl overflow-hidden border-2 border-white shadow-2xl bg-white aspect-[3/4.2]">
                    <Image
                      src="/images/bct-team-hero.png"
                      alt="فريق ومستشارو شركة بشدار للاستشارات والتدريب - BCT"
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 520px"
                      className="object-cover object-top"
                    />
                  </div>

                  {/* Floating Trust Card Top-Left */}
                  <div className="hero-floating-badge absolute top-3 left-3 sm:-top-4 sm:-left-6 p-2.5 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#132238]/10 shadow-xl flex items-center gap-2.5 sm:gap-3 animate-float z-10">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#31B7A6]/15 flex items-center justify-center text-[#31B7A6]">
                      <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] sm:text-xs text-[#5B6878] font-semibold">سجل تجاري رسمي</div>
                      <div className="text-xs sm:text-sm font-black text-[#132238] font-mono">226285</div>
                    </div>
                  </div>

                  {/* Floating Rate Card Bottom-Right */}
                  <div className="hero-floating-badge absolute -bottom-3 right-3 sm:-bottom-4 sm:-right-6 p-2.5 sm:p-3.5 rounded-2xl bg-[#132238]/95 backdrop-blur-md text-white border border-white/10 shadow-xl flex items-center gap-2.5 sm:gap-3 z-10">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#E8832A]/20 flex items-center justify-center text-[#E8832A]">
                      <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] sm:text-xs text-white/70 font-semibold">تخفيض السودانيين</div>
                      <div className="text-xs sm:text-sm font-black text-[#E8832A]">خصم 70%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* TRUST & LEGAL CREDENTIALS BAR                                             */}
        {/* ========================================================================= */}
        <section className="bg-white border-b border-[#132238]/10 py-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center md:text-right">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#12516A]/10 flex items-center justify-center text-[#12516A] flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#5B6878] font-semibold">سجل تجاري رسمي</div>
                  <div className="text-sm font-bold text-[#132238] font-mono">{companyData.commercialReg}</div>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E8832A]/10 flex items-center justify-center text-[#E8832A] flex-shrink-0">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#5B6878] font-semibold">بطاقة ضريبية معتمدة</div>
                  <div className="text-sm font-bold text-[#132238] font-mono">{companyData.taxNumber}</div>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#31B7A6]/10 flex items-center justify-center text-[#31B7A6] flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#5B6878] font-semibold">المقر الميداني</div>
                  <div className="text-sm font-bold text-[#132238]">الدقي (بجوار سفارة السودان)</div>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF654F]/10 flex items-center justify-center text-[#FF654F] flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#5B6878] font-semibold">الاتصال المباشر</div>
                  <div className="text-sm font-bold text-[#132238] font-mono">{companyData.phones[0]}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 1: ABOUT BCT WITH AUTHENTIC COMPANY POSTERS                       */}
        {/* ========================================================================= */}
        <section id="about" className="py-20 bg-[#F6F3EE] border-b border-[#132238]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Authentic Asset Grid - 2 Posters: رسالة إلى أولياء الأمور + نصيحة لكل طالب */}
              <div className="lg:col-span-6 relative about-animate-item">
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  {/* Poster 1: رسالة إلى أولياء الأمور */}
                  <div className="poster-frame relative rounded-2xl overflow-hidden shadow-lg aspect-[3/4.2] border-2 border-white bg-white">
                    <Image
                      src="/images/bct-parents-message.png"
                      alt="رسالة إلى أولياء الأمور - شركة بشدار للاستشارات والتدريب"
                      fill
                      sizes="(max-width: 768px) 50vw, 320px"
                      className="object-cover object-top"
                    />
                  </div>

                  {/* Poster 2: نصيحة لكل طالب */}
                  <div className="poster-frame relative rounded-2xl overflow-hidden shadow-lg aspect-[3/4.2] mt-6 sm:mt-8 border-2 border-white bg-white">
                    <Image
                      src="/images/bct-student-advice.png"
                      alt="نصيحة لكل طالب - شركة بشدار للاستشارات والتدريب"
                      fill
                      sizes="(max-width: 768px) 50vw, 320px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>

                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full bg-[#132238] text-white text-xs font-bold shadow-xl border border-white/10 flex items-center gap-2 whitespace-nowrap z-10">
                  <CheckCircle2 className="w-4 h-4 text-[#31B7A6]" />
                  <span>إرشادات ورسائل رسمية من مستشاري بشدار</span>
                </div>
              </div>

              {/* About Text Content */}
              <div className="lg:col-span-6 text-right about-animate-item">
                <SectionHeading
                  tag="عن شركة بشدار"
                  title="خبرة استشارية موثوقة في قلب القاهرة والجيزة"
                  subtitle="تأسست شركة بشدار للاستشارات والتدريب (BCT) لتكون الجسر الأكاديمي الشفاف والآمن بين الطالب العربي وأعرق الصروح التعليمية المصرية."
                  centered={false}
                />

                <div className="space-y-4 text-sm sm:text-base text-[#5B6878] leading-relaxed mt-6">
                  <p>
                    نحن مؤسسة رسمية مسجلة بالسجل التجاري المصري رقم <strong>226285</strong> وبطاقة ضريبية رقم <strong>274-135-760</strong>، نعمل انطلاقاً من مقرنا الرئيسي في <strong>10 ب شارع أحمد الشاطوري المتفرع من شارع الدقي بجوار سفارة جمهورية السودان</strong>.
                  </p>
                  <p>
                    نتميز بالمعرفة العميقة باللوائح التنظيمية لمنظومة الوافدين المصرية (منصة ادرس في مصر)، ونوفر المشورة الأكاديمية المجردة لحماية الطلاب من المصائد الإجرائية مثل فخاخ الحسابات البنكية المجهولة أو مواعيد التقديم غير الدقيقة.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  <div className="p-4 rounded-2xl bg-white border border-[#132238]/10 premium-card">
                    <div className="flex items-center gap-2 text-sm font-bold text-[#132238] mb-1">
                      <CheckCircle2 className="w-4 h-4 text-[#E8832A]" />
                      <span>حضور رسمي وميداني</span>
                    </div>
                    <p className="text-xs text-[#5B6878] m-0">
                      مقر دائم بجوار سفارة السودان ومتابعة ورقية داخل كليات وجامعات مصر.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#132238]/10 premium-card">
                    <div className="flex items-center gap-2 text-sm font-bold text-[#132238] mb-1">
                      <CheckCircle2 className="w-4 h-4 text-[#31B7A6]" />
                      <span>شفافية مالية تامة</span>
                    </div>
                    <p className="text-xs text-[#5B6878] m-0">
                      إيصالات سداد رسمية باسم الطالب فقط لمنع ضياع المصروفات الجامعية.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: OUR SERVICES (HIGH-CONTRAST PETROLEUM NAVY SECTION)           */}
        {/* ========================================================================= */}
        <section id="services" className="py-20 bg-[#132238] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              tag="خدماتنا المعتمدة"
              title="منظومة متكاملة لخدمة الطالب من القبول حتى التخرج"
              subtitle="نقدم 6 خدمات رئيسية موثقة في كتيب التقديم تغطي كافة الاحتياجات الأكاديمية والقانونية والمعيشية للطالب في مصر."
              dark={true}
              centered={true}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {servicesData.map((service, idx) => (
                <div
                  key={service.id}
                  className="service-card-item premium-card group relative p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#E8832A]/50 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#E8832A]/20 text-[#E8832A] flex items-center justify-center font-bold text-lg mb-6 group-hover:scale-110 transition-transform">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                      {service.shortDesc}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {service.benefits.slice(0, 3).map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-white/80">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#31B7A6] flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={`https://wa.me/${companyData.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`مرحباً شركة بشدار، أود الاستفسار عن خدمة: ${service.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="premium-btn inline-flex items-center justify-between w-full pt-4 border-t border-white/10 text-xs font-bold text-[#E8832A] hover:text-white transition-colors no-underline"
                  >
                    <span>طلب الخدمة عبر واتساب</span>
                    <ArrowLeft className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: EGYPTIAN UNIVERSITIES EXPLORER                                */}
        {/* ========================================================================= */}
        <section id="universities" className="py-20 bg-[#F6F3EE] border-b border-[#132238]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <SectionHeading
                tag="دليل الجامعات المصرية"
                title="26 جامعة حكومية معتمدة عبر كافة المحافظات"
                subtitle="اختر وجهتك الأكاديمية بين الجامعات الكبرى في العاصمة أو الجامعات الإقليمية المتميزة بتكاليف معيشية مناسبة."
                centered={false}
              />

              {/* Filter Pills */}
              <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-[#132238]/10 self-start md:self-auto">
                <button
                  type="button"
                  onClick={() => setUniFilter("all")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    uniFilter === "all"
                      ? "bg-[#132238] text-white shadow-sm"
                      : "text-[#5B6878] hover:text-[#132238]"
                  }`}
                >
                  الكل ({universitiesData.length})
                </button>
                <button
                  type="button"
                  onClick={() => setUniFilter("major")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    uniFilter === "major"
                      ? "bg-[#132238] text-white shadow-sm"
                      : "text-[#5B6878] hover:text-[#132238]"
                  }`}
                >
                  الجامعات الكبرى
                </button>
                <button
                  type="button"
                  onClick={() => setUniFilter("regional")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    uniFilter === "regional"
                      ? "bg-[#132238] text-white shadow-sm"
                      : "text-[#5B6878] hover:text-[#132238]"
                  }`}
                >
                  الجامعات الإقليمية
                </button>
              </div>
            </div>

            {/* University Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUniversities.map((uni) => (
                <div
                  key={uni.id}
                  className="uni-card-item premium-card p-6 rounded-3xl bg-white border border-[#132238]/10 shadow-sm transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#12516A]/10 text-[#12516A]">
                        {uni.governorate}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#5B6878]">
                        تأسست {uni.establishedYear} م
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-[#132238] mb-2">
                      {uni.nameAr}
                    </h3>
                    <p className="text-xs text-[#5B6878] leading-relaxed line-clamp-3 mb-4">
                      {uni.overview}
                    </p>

                    <div className="space-y-1.5 pt-3 border-t border-slate-100 mb-6">
                      <div className="text-[11px] font-bold text-[#132238]">أبرز الكليات المعتمدة:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {uni.featuredFaculties.slice(0, 3).map((f, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-[#132238] font-medium"
                          >
                            {f.facultyName}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/universities"
                    className="premium-btn inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold text-[#132238] bg-[#F6F3EE] hover:bg-[#E8832A] hover:text-white transition-all no-underline"
                  >
                    <span>تفاصيل التنسيق والشروط الكاملة</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/universities"
                className="premium-btn inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-[#132238] hover:bg-[#12516A] transition-all no-underline shadow-md"
              >
                <span>استعراض كافة الجامعات الـ 26 بالكامل</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: ADMISSION ROADMAP (7 MILESTONES)                               */}
        {/* ========================================================================= */}
        <section id="admissions" className="py-20 bg-white border-b border-[#132238]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              tag="مسار التقديم خطوة بخطوة"
              title="7 محطات واضحة تضمن مقعدك الجامعي الرسمي"
              subtitle="رحلة منظمة من استلام الملف الورقي وتوثيقه حتى استلام إفادة القبول النهائي والبطاقة الجامعية."
              centered={true}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {admissionWorkflow.slice(0, 4).map((step) => (
                <div
                  key={step.stepNumber}
                  className="admission-card-item premium-card p-6 rounded-3xl bg-[#F6F3EE] border border-[#132238]/10 relative flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-10 h-10 rounded-2xl bg-[#E8832A] text-white flex items-center justify-center font-black text-sm">
                        {step.stepNumber}
                      </span>
                      {step.feesRequired && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white text-[#132238] border border-slate-200">
                          {step.feesRequired}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-[#132238] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#5B6878] leading-relaxed mb-4">
                      {step.description}
                    </p>
                  </div>

                  {step.criticalWarnings && (
                    <div className="p-3 rounded-xl bg-[#FF654F]/10 border border-[#FF654F]/20 text-[11px] text-[#9A2617] flex items-start gap-1.5 mt-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#FF654F] flex-shrink-0 mt-0.5" />
                      <span>{step.criticalWarnings[0]}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Second row of steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {admissionWorkflow.slice(4, 7).map((step) => (
                <div
                  key={step.stepNumber}
                  className="admission-card-item premium-card p-6 rounded-3xl bg-[#F6F3EE] border border-[#132238]/10 relative flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-10 h-10 rounded-2xl bg-[#132238] text-white flex items-center justify-center font-black text-sm">
                        {step.stepNumber}
                      </span>
                      {step.feesRequired && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white text-[#132238] border border-slate-200">
                          {step.feesRequired}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-[#132238] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#5B6878] leading-relaxed mb-4">
                      {step.description}
                    </p>
                  </div>

                  {step.criticalWarnings && (
                    <div className="p-3 rounded-xl bg-[#FF654F]/10 border border-[#FF654F]/20 text-[11px] text-[#9A2617] flex items-start gap-1.5 mt-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#FF654F] flex-shrink-0 mt-0.5" />
                      <span>{step.criticalWarnings[0]}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Critical Financial Disclaimer Box */}
            <div className="mt-8 p-6 rounded-3xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start gap-4 text-right">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700 flex-shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-amber-950 mb-1">
                  تنبيه رسمي بشأن الإيداعات البنكية (فخ سداد الرسوم)
                </h4>
                <p className="text-xs sm:text-sm text-amber-800 leading-relaxed m-0">
                  تحذر شركة بشدار من سداد الرسوم الجامعية أو رسوم التنسيق من خلال حسابات وسيطة غير باسم الطالب؛ يجب أن يتطابق اسم المودع في إيصال بنك القاهرة أو البنك الأهلي المصري مع اسم الطالب الرباعي المطابق لجواز السفر منعاً لرفض الملف وضياع الرسوم.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: CERTIFICATES & LEGALIZATION REQUIREMENTS                       */}
        {/* ========================================================================= */}
        <section id="requirements" className="py-20 bg-[#F6F3EE] border-b border-[#132238]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              tag="شروط وتوثيق الشهادات"
              title="دليل التصديقات والمتطلبات بحسب بلد إصدار الشهادة"
              subtitle="تعرف على سلم التوثيقات الرسمي والمستندات المطلوبة للتقديم الإلكتروني والملف الورقي النهائي."
              centered={true}
            />

            {/* Certificate Tabs */}
            <div className="requirements-animate-item flex flex-wrap items-center justify-center gap-2 mt-8 mb-10">
              {certificateRequirements.map((cert) => (
                <button
                  key={cert.id}
                  type="button"
                  onClick={() => setActiveCert(cert.id)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                    activeCert === cert.id
                      ? "bg-[#E8832A] text-white shadow-md scale-105"
                      : "bg-white text-[#132238] border border-[#132238]/10 hover:bg-slate-50"
                  }`}
                >
                  {cert.certificateName}
                </button>
              ))}
            </div>

            {/* Active Certificate Content Display */}
            <div className="requirements-animate-item p-8 sm:p-10 rounded-3xl bg-white border border-[#132238]/10 shadow-sm max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
                <div>
                  <span className="text-xs font-bold text-[#E8832A] block mb-1">
                    الدولة: {selectedCert.country}
                  </span>
                  <h3 className="text-2xl font-black text-[#132238]">
                    {selectedCert.certificateName}
                  </h3>
                </div>
                <div className="px-4 py-1.5 rounded-full bg-[#12516A]/10 text-[#12516A] text-xs font-bold self-start sm:self-auto">
                  الدفعات المشمولة: {selectedCert.batchesCovered}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                {/* Electronic Submission Docs */}
                <div>
                  <h4 className="text-sm font-bold text-[#132238] flex items-center gap-2 mb-4">
                    <FileCheck className="w-4 h-4 text-[#31B7A6]" />
                    <span>مستندات التقديم الإلكتروني المبدئي:</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedCert.electronicSubmissionDocs.map((doc, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#5B6878]">
                        <CheckCircle2 className="w-4 h-4 text-[#31B7A6] flex-shrink-0 mt-0.5" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Physical File Docs */}
                <div>
                  <h4 className="text-sm font-bold text-[#132238] flex items-center gap-2 mb-4">
                    <Building2 className="w-4 h-4 text-[#E8832A]" />
                    <span>محتويات الملف الورقي (تسليم السفارة/الإدارة):</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedCert.physicalFileDocs.map((doc, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#5B6878]">
                        <CheckCircle2 className="w-4 h-4 text-[#E8832A] flex-shrink-0 mt-0.5" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Special Conditions */}
              {selectedCert.specialConditions && selectedCert.specialConditions.length > 0 && (
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-[#132238] mb-2">شروط وتنبيهات خاصة بهذه الشهادة:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCert.specialConditions.map((cond, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-medium"
                      >
                        {cond}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 6: TUITION FEES & HISTORICAL ACCEPTANCE THRESHOLDS                */}
        {/* ========================================================================= */}
        <section id="fees" className="py-20 bg-white border-b border-[#132238]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              tag="الرسوم الجامعية والتنسيق"
              title="الرسوم الرسمية بالدولار الأمريكي ونسب التخفيض"
              subtitle="بيان واضح للرسوم السنوية لكافة القطاعات الجامعية، مع بيان نسبة خصم الطلاب السودانيين الحالية (70%)."
              centered={true}
            />

            {/* Sudan Discount Warning Callout */}
            <div className="fees-animate-item max-w-4xl mx-auto my-8 p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="text-right">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#E8832A] text-white mb-2">
                  <span>تحديث رسمي هام</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-1">
                  نسبة تخفيض الطلاب السودانيين الحالية: 70%
                </h4>
                <p className="text-xs text-white/75 m-0 leading-relaxed max-w-xl">
                  تعديل النسبة الرسمية من 90% إلى 70% منذ العام الجامعي 2023/2024. يدفع الطالب 30% فقط من الرسوم السنوية المقررة على الطلاب الوافدين بالإضافة لرسم القيد لأول سنة فقط ($1,500).
                </p>
              </div>
              <div className="text-center sm:text-left flex-shrink-0">
                <div className="text-3xl font-black text-[#31B7A6]">خصم 70%</div>
                <div className="text-xs text-white/60 font-mono">توفير سنوي مباشر</div>
              </div>
            </div>

            {/* Fees Table */}
            <div className="fees-animate-item max-w-4xl mx-auto overflow-hidden rounded-3xl border border-[#132238]/10 shadow-sm bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-sm">
                  <thead className="bg-[#F6F3EE] text-[#132238] font-bold border-b border-[#132238]/10">
                    <tr>
                      <th className="py-4 px-6">القطاع الأكاديمي</th>
                      <th className="py-4 px-6">الرسم السنوي الرسمي</th>
                      <th className="py-4 px-6">للسودانيين بعد خصم 70%</th>
                      <th className="py-4 px-6">رسم القيد (أول سنة)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="py-4 px-6 font-bold text-[#132238]">
                        الطب البشري وطب الأسنان
                      </td>
                      <td className="py-4 px-6 font-mono text-[#5B6878]">$6,000</td>
                      <td className="py-4 px-6 font-mono font-bold text-[#E8832A]">$1,800</td>
                      <td className="py-4 px-6 font-mono text-[#5B6878]">$1,500</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-4 px-6 font-bold text-[#132238]">
                        الصيدلة، الهندسة، والحاسبات والمعلومات
                      </td>
                      <td className="py-4 px-6 font-mono text-[#5B6878]">$5,000</td>
                      <td className="py-4 px-6 font-mono font-bold text-[#E8832A]">$1,500</td>
                      <td className="py-4 px-6 font-mono text-[#5B6878]">$1,500</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-4 px-6 font-bold text-[#132238]">
                        العلاج الطبيعي، الطب البيطري، والتمريض
                      </td>
                      <td className="py-4 px-6 font-mono text-[#5B6878]">$4,000</td>
                      <td className="py-4 px-6 font-mono font-bold text-[#E8832A]">$1,200</td>
                      <td className="py-4 px-6 font-mono text-[#5B6878]">$1,500</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-4 px-6 font-bold text-[#132238]">
                        التجارة، الحقوق، الآداب، والعلوم الإنسانية
                      </td>
                      <td className="py-4 px-6 font-mono text-[#5B6878]">$3,000</td>
                      <td className="py-4 px-6 font-mono font-bold text-[#E8832A]">$900</td>
                      <td className="py-4 px-6 font-mono text-[#5B6878]">$1,500</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 7: STUDENT GUIDANCE & INTERACTIVE FAQS                            */}
        {/* ========================================================================= */}
        <section id="faq" className="py-20 bg-[#F6F3EE] border-b border-[#132238]/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              tag="دليل الطالب الوافد والأسئلة الشائعة"
              title="إجابات دقيقة على أكثر الأسئلة المصيرية للطلاب"
              subtitle="جمعنا لك أهم التساؤلات المتعلقة بالإقامة، الموافقة الأمنية، التحويلات، والسكن في مصر."
              centered={true}
            />

            <div className="space-y-4 mt-12">
              {faqData.slice(0, 6).map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={faq.id}
                    className="faq-animate-item rounded-2xl bg-white border border-[#132238]/10 overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full py-5 px-6 text-right flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#132238] hover:text-[#E8832A] transition-colors"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#E8832A] flex-shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 text-xs sm:text-sm text-[#5B6878] leading-relaxed border-t border-slate-100 pt-4 animate-in fade-in duration-200">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/student-guide"
                className="premium-btn inline-flex items-center gap-2 text-sm font-bold text-[#E8832A] hover:text-[#132238] transition-colors no-underline"
              >
                <span>استعراض كافة أسئلة وإرشادات دليل الطالب الكاملة ←</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 8: CONTACT & DIRECT CONSULTATION WITH AUTHENTIC ADMISSION POSTER */}
        {/* ========================================================================= */}
        <section id="contact" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-[#122137] via-[#132238] to-[#0B1524] text-white shadow-2xl relative overflow-hidden">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8832A]/10 rounded-full filter blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#31B7A6]/10 rounded-full filter blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 items-center">
                <div className="lg:col-span-7 text-right contact-animate-item">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/10 text-[#E8832A] border border-white/15 mb-4">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>استشارة أكاديمية متخصصة ومجانية</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
                    هل أنت مستعد لبدء مسارك الجامعي في مصر؟
                  </h2>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8 max-w-xl">
                    تواصل مباشرة مع مستشاري شركة بشدار لمراجعة درجات شهادتك واقتراح أفضل الكليات والجامعات الحكومية المناسبة لميزانيتك وتطلعاتك المستقبلية.
                  </p>

                  <div className="space-y-3 mb-8 text-xs sm:text-sm text-white/80">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-[#E8832A]" />
                      <span>{companyData.addressDetailed}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-[#31B7A6]" />
                      <span className="font-mono">{companyData.phones.join(" — ")}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-4 h-4 text-[#E8832A]" />
                      <span>سجل تجاري: {companyData.commercialReg} | بطاقة ضريبية: {companyData.taxNumber}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href={`https://wa.me/${companyData.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("مرحباً شركة بشدار، أرغب في حجز استشارة للتقديم في الجامعات المصرية.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="premium-btn inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-black text-white bg-gradient-to-r from-[#E8832A] to-[#FF654F] shadow-lg hover:scale-105 active:scale-95 transition-all no-underline"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>تحدث مع مستشارك عبر واتساب فوراً</span>
                    </a>

                    <Link
                      href="/start"
                      className="premium-btn inline-flex items-center gap-2 px-6 py-4 rounded-full text-base font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all no-underline"
                    >
                      <span>المحطة التفاعلية</span>
                      <ArrowLeft className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Poster 4: تفاصيل التقديم */}
                <div className="lg:col-span-5 relative contact-animate-item">
                  <div className="poster-frame relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden border-2 border-white/30 shadow-2xl bg-[#0B1524] aspect-[3/4.2]">
                    <Image
                      src="/images/bct-admission-details.png"
                      alt="تفاصيل التقديم وشروط القبول - شركة بشدار للاستشارات"
                      fill
                      sizes="(max-width: 768px) 100vw, 480px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
