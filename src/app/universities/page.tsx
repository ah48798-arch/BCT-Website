"use client";

import React, { useState, useMemo } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppFloatingButton } from "@/components/WhatsAppButton";
import { universitiesData } from "@/data/universities";
import {
  Search,
  Building2,
  MapPin,
  Calendar,
  GraduationCap,
  Sparkles,
  Stethoscope,
  Home,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { companyData } from "@/data/company";

export default function UniversitiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTier, setSelectedTier] = useState<"all" | "major" | "regional">("all");
  const [selectedGovernorate, setSelectedGovernorate] = useState<string>("all");

  const governorates = useMemo(() => {
    const list = Array.from(new Set(universitiesData.map((u) => u.governorate)));
    return ["all", ...list];
  }, []);

  const filteredUniversities = useMemo(() => {
    return universitiesData.filter((uni) => {
      const matchesSearch =
        uni.nameAr.includes(searchTerm) ||
        uni.city.includes(searchTerm) ||
        uni.overview.includes(searchTerm) ||
        uni.featuredFaculties.some((f) => f.facultyName.includes(searchTerm));

      const matchesTier = selectedTier === "all" || uni.tier === selectedTier;
      const matchesGov =
        selectedGovernorate === "all" || uni.governorate === selectedGovernorate;

      return matchesSearch && matchesTier && matchesGov;
    });
  }, [searchTerm, selectedTier, selectedGovernorate]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F3EE] text-[#132238]">

      {/* Header Banner */}
      <section className="pt-32 pb-16 bg-[#F6F3EE] border-b border-[#132238]/10 relative overflow-hidden">
        <div className="max-w-[1180px] mx-auto px-6 text-right">
          <div className="flex items-center gap-3 text-[#E8832A] text-[13px] font-bold mb-3">
            <span className="w-[22px] h-[2px] bg-[#E8832A] inline-block" />
            <span>دليل التعليم العالي المصري</span>
          </div>
          <h1 className="text-[32px] sm:text-[44px] font-black text-[#132238] tracking-tight">
            دليل الجامعات المصرية الحكومية
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#5B6878] max-w-3xl font-normal">
            استكشف الجامعات الـ 26 الحكومية المعتمدة، كلياتها الطبية والهندسية، مستشفياتها الجامعية، وتكاليف السكن ومعدلات القبول الاسترشادية للطلاب الوافدين.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="py-6 bg-white border-b border-[#132238]/10 sticky top-[74px] z-30 backdrop-blur-md bg-white/95">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="ابحث باسم الجامعة أو الكلية (مثال: القاهرة، طب، طنطا)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 rounded-full bg-[#F6F3EE] border border-[#132238]/15 text-sm text-[#132238] placeholder-[#5B6878] focus:outline-none focus:border-[#E8832A]"
              />
              <Search className="w-4 h-4 text-[#5B6878] absolute right-3.5 top-3.5" />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <div className="flex rounded-full bg-[#F6F3EE] p-1 border border-[#132238]/10">
                <button
                  onClick={() => setSelectedTier("all")}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedTier === "all"
                      ? "bg-[#E8832A] text-white"
                      : "text-[#5B6878] hover:text-[#132238]"
                  }`}
                >
                  الكل ({universitiesData.length})
                </button>
                <button
                  onClick={() => setSelectedTier("major")}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedTier === "major"
                      ? "bg-[#E8832A] text-white"
                      : "text-[#5B6878] hover:text-[#132238]"
                  }`}
                >
                  الجامعات الكبرى (5)
                </button>
                <button
                  onClick={() => setSelectedTier("regional")}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedTier === "regional"
                      ? "bg-[#E8832A] text-white"
                      : "text-[#5B6878] hover:text-[#132238]"
                  }`}
                >
                  الجامعات الإقليمية
                </button>
              </div>

              <select
                value={selectedGovernorate}
                onChange={(e) => setSelectedGovernorate(e.target.value)}
                className="px-4 py-2 rounded-full bg-[#F6F3EE] border border-[#132238]/15 text-xs text-[#132238] focus:outline-none focus:border-[#E8832A]"
              >
                <option value="all">كافة المحافظات</option>
                {governorates
                  .filter((g) => g !== "all")
                  .map((g) => (
                    <option key={g} value={g}>
                      محافظة {g}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Universities Directory */}
      <section className="py-16 bg-[#F6F3EE]">
        <div className="max-w-[1180px] mx-auto px-6 space-y-10">
          {filteredUniversities.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[28px] border border-[#132238]/10">
              <Building2 className="w-12 h-12 text-[#5B6878] mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[#132238]">لا توجد جامعة تطابق بحثك</h3>
              <p className="text-xs text-[#5B6878] mt-1">
                جرب تغيير كلمة البحث أو فلاتر المحافظات
              </p>
            </div>
          ) : (
            filteredUniversities.map((uni) => (
              <div
                key={uni.id}
                id={uni.id}
                className="bg-white p-7 sm:p-10 rounded-[28px] border border-[#132238]/10 shadow-sm space-y-6 scroll-mt-36 text-right"
              >
                {/* University Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#132238]/10">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono px-3 py-0.5 rounded-full bg-[#132238] text-white">
                        {uni.tier === "major" ? "جامعة كبرى" : "جامعة إقليمية"}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-[#5B6878]">
                        <MapPin className="w-3.5 h-3.5 text-[#E8832A]" />
                        {uni.city}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-[#5B6878]">
                        <Calendar className="w-3.5 h-3.5 text-[#E8832A]" />
                        تأسست {uni.establishedYear}م
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black text-[#132238]">
                      {uni.nameAr}
                    </h2>
                    <span className="text-xs font-mono text-[#5B6878]">
                      {uni.nameEn}
                    </span>
                  </div>

                  {uni.rankingBadge && (
                    <div className="bg-[#FFF8F4] border border-[#E8832A]/30 p-3.5 rounded-2xl max-w-sm text-right">
                      <span className="text-xs text-[#E8832A] font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#E8832A]" />
                        المكانة والتصنيف:
                      </span>
                      <span className="text-xs text-[#132238] block mt-0.5 leading-relaxed">
                        {uni.rankingBadge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Narrative Overview */}
                <p className="text-sm sm:text-base text-[#5B6878] leading-[1.9] font-normal">
                  {uni.overview}
                </p>

                {/* Key Pillars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-[#F6F3EE] border border-[#132238]/5 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-[#132238] text-xs sm:text-sm">
                      <Stethoscope className="w-4 h-4 text-[#E8832A]" />
                      <span>المستشفيات والتدريب السريري:</span>
                    </div>
                    <p className="text-xs text-[#5B6878] leading-relaxed">
                      {uni.hospitalsAndTraining}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F6F3EE] border border-[#132238]/5 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-[#132238] text-xs sm:text-sm">
                      <GraduationCap className="w-4 h-4 text-[#E8832A]" />
                      <span>الحياة الطلابية والحرم:</span>
                    </div>
                    <p className="text-xs text-[#5B6878] leading-relaxed">
                      {uni.studentLife}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F6F3EE] border border-[#132238]/5 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-[#132238] text-xs sm:text-sm">
                      <Home className="w-4 h-4 text-[#E8832A]" />
                      <span>السكن والمواصلات:</span>
                    </div>
                    <p className="text-xs text-[#5B6878] leading-relaxed">
                      {uni.housingAndTransport}
                    </p>
                  </div>
                </div>

                {/* Faculties and Thresholds Table */}
                <div className="pt-2">
                  <h4 className="text-xs font-bold text-[#132238] mb-2.5 uppercase tracking-wider">
                    أبرز كليات التنسيق والحدود الدنيا الاسترشادية:
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                    {uni.featuredFaculties.map((fac, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-[#F6F3EE] border border-[#132238]/5 text-right"
                      >
                        <span className="text-xs font-semibold text-[#132238] block truncate">
                          {fac.facultyName}
                        </span>
                        <span className="text-sm font-mono font-black text-[#E8832A] block mt-1">
                          {fac.minScoreHistorical}
                        </span>
                        {fac.notes && (
                          <span className="text-[10px] text-[#5B6878] block mt-0.5">
                            {fac.notes}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Row */}
                <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#132238]/10">
                  <div className="text-xs text-[#5B6878]">
                    مصدر البيانات: كتيب شركة بشدار ودليل الوافدين الرسمي 2026
                  </div>

                  <a
                    href={`https://wa.me/${companyData.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                      `مرحباً، أود استشارة حول القبول في ${uni.nameAr} والتخصصات المتاحة لمجموعي`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#E8832A] hover:bg-[#D4721A] transition-all shadow-sm"
                  >
                    <span>استشرنا بشأن القبول في {uni.nameAr}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <WhatsAppFloatingButton />
    </div>
  );
}
