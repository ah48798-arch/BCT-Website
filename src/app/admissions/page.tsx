import React from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppFloatingButton } from "@/components/WhatsAppButton";
import { admissionWorkflow } from "@/data/admissions";
import { companyData } from "@/data/company";
import {
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  DollarSign,
  ArrowLeft,
  ShieldAlert,
  Send,
} from "lucide-react";

export const metadata = {
  title: "مسار وخطوات التقديم على «ادرس في مصر» | BCT بشدار",
  description:
    "الدليل الإجرائي الميداني الشامل لمراحل التقديم الـ 7 للجامعات المصرية الحكومية: تسجيل الحساب، فحص الرغبات، سداد الرسوم، تسليم الملف الورقي، والإقامة.",
};

export default function AdmissionsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F3EE] text-[#132238]">

      {/* Header Banner */}
      <section className="pt-32 pb-16 bg-[#F6F3EE] border-b border-[#132238]/10 relative overflow-hidden">
        <div className="max-w-[1180px] mx-auto px-6 text-right">
          <div className="flex items-center gap-3 text-[#E8832A] text-[13px] font-bold mb-3">
            <span className="w-[22px] h-[2px] bg-[#E8832A] inline-block" />
            <span>المنظومة الإلكترونية للوافدين</span>
          </div>
          <h1 className="text-[32px] sm:text-[44px] font-black text-[#132238] tracking-tight">
            مسار وإجراءات التقديم خطوة بخطوة
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#5B6878] max-w-3xl font-normal">
            من إنشاء الحساب على منصة «ادرس في مصر» وحتى استلام شهادة القيد والبطاقة الجامعية، نشرح لك بالتفصيل الدقيق كافة المتطلبات والرسوم والتحذيرات لتفادي أي خطأ.
          </p>
        </div>
      </section>

      {/* Warning Box: The Bank Receipt Error */}
      <section className="py-8 bg-[#FFF8F4] border-b border-[#E8832A]/30">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="flex items-start gap-4 p-6 rounded-[24px] bg-white border border-[#E8832A]/40 shadow-sm text-right">
            <ShieldAlert className="w-8 h-8 text-[#E8832A] shrink-0 mt-1" />
            <div className="space-y-1.5">
              <h3 className="text-base sm:text-lg font-black text-[#132238]">
                تنبيه حاسم في الخطوة الثانية: احذر خطأ إيصال الإيداع البنكي
              </h3>
              <p className="text-xs sm:text-sm text-[#5B6878] leading-[1.8] font-normal">
                إذا قام أحد أقاربك أو أصدقائك بسداد رسوم المنصة نقداً في بنك مصر نيابة عنك،
                <strong className="text-[#E8832A] font-bold"> يجب كتابة اسم الطالب رباعياً ورقم جواز سفره حصراً في خانة «المستفيد»</strong>.
                إذا كُتب اسم القريب المودع، ترفض المنصة الإيصال تلقائياً ولا يُربط بملفك وتضيع الأموال دون أي استرداد!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The 7 Steps Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-[1000px] mx-auto px-6">
          <SectionHeading
            badge="خارطة الطريق الرسمية"
            title="مراحل رحلة التقديم الأكاديمي السبع"
            description="تسلسل زمني موثق وفق تعليمات الإدارة المركزية لشؤون الطلاب الوافدين المصرية."
          />

          <div className="space-y-8 relative before:absolute before:inset-0 before:right-6 md:before:right-8 before:w-0.5 before:bg-[#132238]/10 before:h-full">
            {admissionWorkflow.map((step) => (
              <div
                key={step.stepNumber}
                className="relative flex items-start gap-6 md:gap-8 group"
              >
                {/* Step Circle Marker */}
                <div className="relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#132238] border-2 border-[#E8832A] text-white flex items-center justify-center font-black font-mono text-lg md:text-xl shadow-md shrink-0 group-hover:scale-105 transition-transform">
                  0{step.stepNumber}
                </div>

                {/* Step Card Content */}
                <div className="bg-[#F6F3EE] p-6 sm:p-8 rounded-[28px] border border-[#132238]/10 flex-1 space-y-4 text-right shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#132238]/10">
                    <h3 className="text-lg sm:text-xl font-bold text-[#132238]">
                      {step.title}
                    </h3>
                    {step.estimatedTime && (
                      <span className="flex items-center gap-1.5 text-xs text-[#E8832A] font-mono font-bold">
                        <Clock className="w-3.5 h-3.5" />
                        {step.estimatedTime}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-[#5B6878] leading-[1.8] font-normal">
                    {step.description}
                  </p>

                  {/* Action items */}
                  <div className="space-y-2 pt-1">
                    <h4 className="text-xs font-bold text-[#132238] uppercase tracking-wider">
                      الإجراءات التنفيذية والمستندات:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {step.actionItems.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-xs text-[#5B6878] bg-white p-3 rounded-xl border border-[#132238]/5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#E8832A] shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Critical Warnings */}
                  {step.criticalWarnings && step.criticalWarnings.length > 0 && (
                    <div className="p-4 rounded-xl bg-[#FFF8F4] border border-[#E8832A]/40 text-xs text-[#132238] space-y-1">
                      {step.criticalWarnings.map((warn, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-[#E8832A] shrink-0 mt-0.5" />
                          <span className="font-medium leading-relaxed">{warn}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Fees pill */}
                  {step.feesRequired && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-[#E8832A]/10 text-[#E8832A]">
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>{step.feesRequired}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Paper File Submission Checklist Box */}
      <section className="py-16 bg-[#F6F3EE] border-t border-[#132238]/10">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="bg-white p-8 sm:p-10 rounded-[30px] border border-[#132238]/10 shadow-sm space-y-6 text-right">
            <div className="flex items-center gap-3 pb-4 border-b border-[#132238]/10">
              <div className="w-12 h-12 rounded-2xl bg-[#E8832A]/10 text-[#E8832A] flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#132238]">
                  قائمة محتويات الملف الورقي النهائي لتسليمه بالجامعة
                </h3>
                <p className="text-xs text-[#5B6878]">
                  المستندات الإلزامية التي يجب تسليمها يداً بيد لإدارة الوافدين بالكلية لإتمام القيد
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-[#F6F3EE] border border-[#132238]/5 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E8832A] shrink-0 mt-0.5" />
                <span>أصل الشهادة الثانوية مستوفية التوثيق حتى الخارجية المصرية</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#F6F3EE] border border-[#132238]/5 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E8832A] shrink-0 mt-0.5" />
                <span>أصل شهادة الميلاد أو الرقم الوطني معتمداً</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#F6F3EE] border border-[#132238]/5 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E8832A] shrink-0 mt-0.5" />
                <span>صورة واضحة لصفحة بيانات جواز السفر ساري المفعول</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#F6F3EE] border border-[#132238]/5 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E8832A] shrink-0 mt-0.5" />
                <span>استمارة نتيجة الترشيح المبدئي المطبوعة من المنصة</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#F6F3EE] border border-[#132238]/5 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E8832A] shrink-0 mt-0.5" />
                <span>أصول إيصالات السداد البنكية لرسوم القيد والتأمين الصحي</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#F6F3EE] border border-[#132238]/5 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E8832A] shrink-0 mt-0.5" />
                <span>عدد 6 صور شخصية حديثة بخلفية بيضاء مقاس 4×6</span>
              </div>
            </div>

            <div className="pt-4 text-center">
              <a
                href={`https://wa.me/${companyData.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  "السلام عليكم، أود مرافقة شركة بشدار في مراجعة وتجهيز ملفي الورقي للتقديم بالجامعة"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white bg-[#E8832A] hover:bg-[#D4721A] shadow-md text-sm transition-all"
              >
                <Send className="w-4 h-4" />
                <span>اطلب مرافقة ميدانية لتسليم ملفك بالجامعة</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppFloatingButton />
    </div>
  );
}
