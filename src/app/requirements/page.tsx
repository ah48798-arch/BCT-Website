"use client";

import React, { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppFloatingButton } from "@/components/WhatsAppButton";
import { certificateRequirements } from "@/data/admissions";
import { companyData } from "@/data/company";
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  Building,
  MessageCircle,
} from "lucide-react";

export default function RequirementsPage() {
  const [activeTab, setActiveTab] = useState(certificateRequirements[0].id);

  const currentCert =
    certificateRequirements.find((c) => c.id === activeTab) ||
    certificateRequirements[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F3EE] text-[#132238]">

      {/* Header Banner */}
      <section className="pt-32 pb-16 bg-[#F6F3EE] border-b border-[#132238]/10 relative overflow-hidden">
        <div className="max-w-[1180px] mx-auto px-6 text-right">
          <div className="flex items-center gap-3 text-[#E8832A] text-[13px] font-bold mb-3">
            <span className="w-[22px] h-[2px] bg-[#E8832A] inline-block" />
            <span>شروط المؤهلات وسلسلة التوثيق</span>
          </div>
          <h1 className="text-[32px] sm:text-[44px] font-black text-[#132238] tracking-tight">
            شروط ومتطلبات الشهادات الثانوية
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#5B6878] max-w-3xl font-normal">
            دليلك التفصيلي الموثق لمتطلبات القبول وتوثيق الأوراق حسب دولتك ونوع شهادتك الثانوية للالتحاق بالجامعات المصرية.
          </p>
        </div>
      </section>

      {/* Certificate Selector Tabs */}
      <section className="py-6 bg-white border-b border-[#132238]/10 sticky top-[74px] z-30 backdrop-blur-md bg-white/95">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {certificateRequirements.map((cert) => (
              <button
                key={cert.id}
                onClick={() => setActiveTab(cert.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                  activeTab === cert.id
                    ? "bg-[#E8832A] text-white shadow-md shadow-[#E8832A]/20"
                    : "bg-[#F6F3EE] text-[#5B6878] hover:text-[#132238] border border-[#132238]/10"
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>{cert.certificateName}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Active Certificate Detail View */}
      <section className="py-16 bg-[#F6F3EE]">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="bg-white p-7 sm:p-10 rounded-[28px] border border-[#132238]/10 shadow-sm space-y-8 text-right">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#132238]/10">
              <div>
                <span className="text-xs font-mono font-bold text-[#E8832A] px-3 py-1 rounded-full bg-[#E8832A]/10">
                  الدولة: {currentCert.country}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#132238] mt-2">
                  {currentCert.certificateName}
                </h2>
                <p className="text-xs text-[#5B6878] mt-1 font-medium">
                  الدفعات المشمولة: {currentCert.batchesCovered}
                </p>
              </div>

              <a
                href={`https://wa.me/${companyData.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  `السلام عليكم، أحمل ${currentCert.certificateName} وأرغب في مراجعة أوراقي للتقديم في مصر`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#132238] hover:bg-[#1a2e4a] self-start sm:self-auto shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#E8832A]" />
                <span>فحص أوراقي مجاناً</span>
              </a>
            </div>

            {/* Special Conditions & Warnings */}
            {currentCert.specialConditions && currentCert.specialConditions.length > 0 && (
              <div className="p-6 rounded-[22px] bg-[#FFF8F4] border border-[#E8832A]/30 space-y-2.5">
                <div className="flex items-center gap-2 font-black text-[#132238] text-sm">
                  <AlertTriangle className="w-5 h-5 text-[#E8832A]" />
                  <span>تنبيهات وشروط استثنائية هامة جداً:</span>
                </div>
                <div className="space-y-2 text-xs text-[#5B6878] leading-relaxed">
                  {currentCert.specialConditions.map((cond, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8832A] shrink-0 mt-1.5" />
                      <span className="font-medium text-[#132238]">{cond}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Electronic Submission Requirements */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#132238] flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-[#E8832A]" />
                <span>المستندات المطلوبة للرفع الإلكتروني على السيستم:</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#5B6878]">
                {currentCert.electronicSubmissionDocs.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#F6F3EE] border border-[#132238]/5 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-medium text-[#132238]">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Physical File Submission Requirements */}
            <div className="space-y-3 pt-4 border-t border-[#132238]/10">
              <h3 className="text-base font-bold text-[#132238] flex items-center gap-2">
                <Building className="w-5 h-5 text-[#E8832A]" />
                <span>التوثيق المطلوب لتسليم الملف الورقي الأصلي بالجامعة:</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#5B6878]">
                {currentCert.physicalFileDocs.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#F6F3EE] border border-[#132238]/5 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-medium text-[#132238]">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Attestation Guide */}
      <section className="py-16 bg-white border-t border-[#132238]/10">
        <div className="max-w-[1000px] mx-auto px-6 space-y-8 text-right">
          <SectionHeading
            badge="سلسلة التوثيقات الرسمية"
            title="الدليل المبسط لتوثيق الشهادات لتفادي تعطيل القبول"
            description="نفرق لك بين ما تحتاجه للرفع على المنصة في البداية وما يلزمك لتسليم الملف الورقي بالجامعة."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-[22px] bg-[#F6F3EE] border border-[#132238]/10 space-y-3">
              <h4 className="text-base font-bold text-[#132238] pb-2 border-b border-[#132238]/10 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E8832A]" />
                المرحلة 1: التوثيق المطلوب للتقديم الإلكتروني
              </h4>
              <p className="text-xs text-[#5B6878] leading-[1.8]">
                في هذه المرحلة، تكتفي المنظومة الإلكترونية بختم وزارة التربية والتعليم الصادر منها الشهادة لبدء فحص ملفك، باستثناء طلاب الشهادة السودانية (الدفعات المؤجلة 2023 و 2024) حيث يلزمهم حتماً ختم حداثة المؤهل من السفارة بالقاهرة.
              </p>
            </div>

            <div className="p-6 rounded-[22px] bg-[#F6F3EE] border border-[#132238]/10 space-y-3">
              <h4 className="text-base font-bold text-[#132238] pb-2 border-b border-[#132238]/10 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                المرحلة 2: التوثيق المطلوب لتسليم الملف الورقي
              </h4>
              <p className="text-xs text-[#5B6878] leading-[1.8]">
                عند صدور الترشيح المبدئي والتوجه للجامعة، تشترط إدارة الوافدين استيفاء السلسلة الدبلوماسية الكاملة: خارجية بلد الصدور + القنصلية المصرية هناك، أو خارجية بلد الصدور + سفارة الدولة بالقاهرة + الخارجية المصرية.
              </p>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppFloatingButton />
    </div>
  );
}
