"use client";

import React, { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppFloatingButton } from "@/components/WhatsAppButton";
import {
  securityClearancePaths,
  foreignTransferTruth,
  fatalMistakes,
  livingAndHousingInfo,
  faqData,
} from "@/data/guide";
import {
  ShieldAlert,
  Home,
  FileText,
  AlertTriangle,
  ChevronDown,
  Plane,
} from "lucide-react";
import { companyData } from "@/data/company";

export default function StudentGuidePage() {
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>("all");
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-1");

  const filteredFaqs = faqData.filter(
    (faq) => selectedFaqCategory === "all" || faq.category === selectedFaqCategory
  );

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F3EE] text-[#132238]">

      {/* Header Banner */}
      <section className="pt-32 pb-16 bg-[#F6F3EE] border-b border-[#132238]/10 relative overflow-hidden">
        <div className="max-w-[1180px] mx-auto px-6 text-right">
          <div className="flex items-center gap-3 text-[#E8832A] text-[13px] font-bold mb-3">
            <span className="w-[22px] h-[2px] bg-[#E8832A] inline-block" />
            <span>دليل المعيشة والإجراءات الميدانية</span>
          </div>
          <h1 className="text-[32px] sm:text-[44px] font-black text-[#132238] tracking-tight">
            دليل الطالب الوافد والأسئلة الشائعة
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#5B6878] max-w-3xl font-normal">
            كل ما يحتاجه الطالب السوداني والعربي من واقع التجربة الميدانية: تصاريح الدخول، الإقامة الدراسية، أخطاء الإيصالات، السكن الطلابي، وبنك الأسئلة الشامل.
          </p>
        </div>
      </section>

      {/* Fatal Mistakes Warnings Section */}
      <section className="py-16 bg-[#FFF8F4] border-b border-[#E8832A]/30">
        <div className="max-w-[1000px] mx-auto px-6 space-y-8 text-right">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#E8832A]/15 text-[#E8832A]">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#E8832A] uppercase tracking-wider">
                من كواليس الواقع الميداني
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#132238]">
                أخطر خطأين يقع فيهما الطلاب وأولياء الأمور
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fatalMistakes.map((mistake) => (
              <div
                key={mistake.id}
                className="p-7 rounded-[26px] bg-white border border-[#E8832A]/35 space-y-4 shadow-sm"
              >
                <h3 className="text-lg font-bold text-[#E8832A] flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-rose-500" />
                  <span>{mistake.title}</span>
                </h3>
                <div className="space-y-2.5 text-xs sm:text-sm text-[#5B6878] leading-relaxed font-normal">
                  <p>
                    <strong className="text-[#132238]">الخطأ الشائع:</strong> {mistake.description}
                  </p>
                  <p className="text-rose-700 bg-rose-50 p-3 rounded-xl border border-rose-200">
                    <strong className="text-rose-800">النتيجة الكارثية:</strong> {mistake.consequence}
                  </p>
                  <p className="text-emerald-800 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                    <strong className="text-emerald-900">التصرف السليم:</strong> {mistake.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Clearance Pathways */}
      <section className="py-16 bg-white">
        <div className="max-w-[1050px] mx-auto px-6 space-y-8 text-right">
          <SectionHeading
            badge="دخول جمهورية مصر العربية"
            title="مسارات استخراج الموافقة الأمنية للدراسة"
            description="مقارنة موضوعية بين مسار الموافقة الأمنية الخاصة ومسار الموافقة الصادرة عن إدارة الوافدين."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityClearancePaths.map((path) => (
              <div
                key={path.id}
                className="bg-[#F6F3EE] p-7 rounded-[26px] border border-[#132238]/10 space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Plane className="w-5 h-5 text-[#E8832A]" />
                    <h3 className="text-xl font-bold text-[#132238]">{path.name}</h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#5B6878] leading-[1.8] font-normal mb-4">
                    {path.description}
                  </p>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-xl bg-white border border-[#132238]/5 flex items-center justify-between">
                      <span className="text-[#5B6878]">السرعة الزمنية:</span>
                      <span className="text-[#132238] font-bold">{path.speed}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-[#132238]/5 flex items-center justify-between">
                      <span className="text-[#5B6878]">نسبة القبول:</span>
                      <span className="text-emerald-700 font-bold">{path.acceptanceRate}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-[#132238]/5 flex items-center justify-between">
                      <span className="text-[#5B6878]">مدة الصلاحية:</span>
                      <span className="text-[#E8832A] font-bold">{path.validity}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#132238]/10 text-xs text-[#5B6878]">
                  يوصى به: {path.recommendedFor}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Residency Section */}
      <section className="py-16 bg-[#F6F3EE] border-t border-[#132238]/10">
        <div className="max-w-[1000px] mx-auto px-6 space-y-6 text-right">
          <SectionHeading
            badge="الوضع القانوني والإقامة"
            title="الإقامة الدراسية السنوية للطلاب الوافدين"
            description="الوثيقة القانونية الرسمية التي تضمن أمانك واستقرارك وسفرك بحرية طوال سنوات دراستك الجامعية."
          />

          <div className="bg-white p-8 sm:p-10 rounded-[28px] border border-[#132238]/10 shadow-sm space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-[#132238]">ما هي الإقامة الدراسية وما مميزاتها؟</h3>
              <p className="text-sm text-[#5B6878] leading-[1.8] font-normal">
                وثيقة تصدرها مصلحة الجوازات والهجرة بناءً على شهادة القيد الصادرة من كليتك. تُمنح لمدة عام وتجدد بانتظام استمرار قيدك. وتمنحك التواجد القانوني الكامل، وسهولة فتح الحسابات البنكية واستلام الحوالات عبر ويسترن يونيون، وإمكانية السفر خارج مصر والعودة إليها دون الحاجة لتأشيرة أو موافقة أمنية جديدة في كل مرة.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-5 rounded-2xl bg-[#F6F3EE] border border-[#132238]/5 space-y-2">
                <h4 className="font-bold text-[#132238] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#E8832A]" />
                  المستندات المطلوبة للإقامة:
                </h4>
                <ul className="space-y-1.5 text-[#5B6878] text-xs">
                  <li>• أصل جواز السفر + صورتين لصفحة البيانات.</li>
                  <li>• أصل شهادة القيد الدراسي الحديثة من الكلية + صورتين.</li>
                  <li>• عدد 2 صورة ضوئية لآخر ختم دخول لمصر.</li>
                  <li>• صورتين للإقامة القديمة في حالة التجديد.</li>
                  <li>• إيصال سداد الرسوم البنكية (25 دولاراً أمريكياً).</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-[#FFF8F4] border border-[#E8832A]/30 space-y-2">
                <h4 className="font-bold text-rose-600 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  محاذير هامة جداً لسالمتك:
                </h4>
                <ul className="space-y-1.5 text-[#5B6878] text-xs">
                  <li>• الإقامة مؤقتة ومربوطة بالدراسة فقط؛ انقطاعك يلغيها تلقائياً.</li>
                  <li>• التأخر في التجديد يعرضك لغرامات مالية وتعطيل معاملاتك اليومية.</li>
                  <li>• اشترط الدخول بتأشيرة أو موافقة رسمية لتتمكن من استخراجها.</li>
                  <li>• ابدأ بإجراءات الإقامة فور استلام شهادة القيد دون أي تأخير.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Foreign Transfer Truth Check */}
      <section className="py-16 bg-white border-t border-[#132238]/10">
        <div className="max-w-[1000px] mx-auto px-6 space-y-6 text-right">
          <SectionHeading
            badge="شفافية أكاديمية مطلقة"
            title={foreignTransferTruth.title}
            description={foreignTransferTruth.summary}
          />

          <div className="space-y-4">
            {foreignTransferTruth.hardTruths.map((truth, i) => (
              <div
                key={i}
                className="p-6 rounded-[20px] bg-[#F6F3EE] border border-[#132238]/10 text-right space-y-1"
              >
                <h4 className="text-base font-bold text-[#132238] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  {truth.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#5B6878] leading-[1.8] font-normal pr-4">
                  {truth.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Living & Housing Guide */}
      <section className="py-16 bg-[#F6F3EE] border-t border-[#132238]/10">
        <div className="max-w-[1050px] mx-auto px-6 space-y-8 text-right">
          <SectionHeading
            badge="السكن والمعيشة"
            title="خيارات السكن الطلابي وتكلفة المعيشة في مصر"
            description={livingAndHousingInfo.monthlyLivingCosts}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {livingAndHousingInfo.housingTypes.map((ht, i) => (
              <div
                key={i}
                className="p-6 rounded-[24px] bg-white border border-[#132238]/10 space-y-3"
              >
                <Home className="w-6 h-6 text-[#E8832A]" />
                <h3 className="text-lg font-bold text-[#132238]">{ht.type}</h3>
                <p className="text-xs text-[#5B6878] leading-[1.8] font-normal">
                  <strong className="text-emerald-700">المميزات:</strong> {ht.pros}
                </p>
                <p className="text-xs text-[#5B6878] leading-[1.8]">
                  <strong className="text-[#132238]">ملاحظات:</strong> {ht.notes}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section className="py-20 bg-white border-t border-[#132238]/10">
        <div className="max-w-[900px] mx-auto px-6 space-y-8 text-right">
          <SectionHeading
            badge="بنك الأسئلة الشائعة"
            title="إجابات موثقة على أكثر استفسارات الطلاب وأولياء الأمور"
            description="إجابات واضحة ومباشرة مستمدة من دليل الوافدين الرسمي واللوائح الجامعية."
          />

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "كافة الأسئلة" },
              { id: "admissions", label: "القبول والتنسيق" },
              { id: "fees", label: "الرسوم والمنحة" },
              { id: "residency", label: "الإقامة والتأشيرة" },
              { id: "transfer", label: "التحويل من الخارج" },
              { id: "housing", label: "السكن والمعيشة" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedFaqCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedFaqCategory === cat.id
                    ? "bg-[#E8832A] text-white shadow-sm"
                    : "bg-[#F6F3EE] text-[#5B6878] hover:text-[#132238] border border-[#132238]/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Accordion list */}
          <div className="space-y-3">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-[20px] border border-[#132238]/10 bg-[#F6F3EE] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 text-right font-bold text-sm sm:text-base text-[#132238] flex items-center justify-between gap-4 hover:bg-slate-100 transition-colors"
                  >
                    <span className="flex-1">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#E8832A] shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="p-5 pt-0 text-xs sm:text-sm text-[#5B6878] leading-[1.9] font-normal border-t border-[#132238]/5 bg-white">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-8 text-center">
            <p className="text-xs text-[#5B6878] mb-3">
              لديك سؤال لم تجد إجابته هنا؟ تواصل مباشرة مع فريق مستشارينا
            </p>
            <a
              href={`https://wa.me/${companyData.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                "السلام عليكم، لدي استفسار إضافي بشأن القبول في الجامعات المصرية"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-white bg-[#E8832A] hover:bg-[#D4721A] text-xs shadow-md"
            >
              <span>اطرح سؤالك عبر واتساب فوراً</span>
            </a>
          </div>
        </div>
      </section>

      <WhatsAppFloatingButton />
    </div>
  );
}
