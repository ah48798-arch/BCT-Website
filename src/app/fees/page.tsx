import React from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppFloatingButton } from "@/components/WhatsAppButton";
import { feeItems, thresholdsData } from "@/data/admissions";
import { companyData } from "@/data/company";
import {
  DollarSign,
  GraduationCap,
  AlertTriangle,
  ShieldCheck,
  Percent,
} from "lucide-react";

export const metadata = {
  title: "دليل الرسوم وتنسيق الجامعات المصرية | BCT بشدار",
  description:
    "جداول رسوم التقديم الرسمية لمنصة ادرس في مصر والجامعات، ونسب القبول الاسترشادية لكليات القمة، وتفاصيل منحة وخصم الـ 70% للطلاب السودانيين.",
};

export default function FeesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F3EE] text-[#132238]">

      {/* Header Banner */}
      <section className="pt-32 pb-16 bg-[#F6F3EE] border-b border-[#132238]/10 relative overflow-hidden">
        <div className="max-w-[1180px] mx-auto px-6 text-right">
          <div className="flex items-center gap-3 text-[#E8832A] text-[13px] font-bold mb-3">
            <span className="w-[22px] h-[2px] bg-[#E8832A] inline-block" />
            <span>الشفافية المالية والتنسيقية</span>
          </div>
          <h1 className="text-[32px] sm:text-[44px] font-black text-[#132238] tracking-tight">
            دليل الرسوم ونسب القبول الاسترشادية
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#5B6878] max-w-3xl font-normal">
            بيانات مالية وأكاديمية موثقة من واقع القرارات التنظيمية للأعوام السابقة، تشمل رسوم المنصة، القيد الجامعي، وتفاصيل منحة الـ 70% للسودانيين.
          </p>
        </div>
      </section>

      {/* Official Fees Table */}
      <section className="py-16 bg-white">
        <div className="max-w-[1050px] mx-auto px-6 space-y-6">
          <SectionHeading
            badge="الرسوم الإجرائية الرسمية"
            title="جدول الرسوم المقررة لمنظومة الوافدين والجامعات"
            description="رسوم معاملات منصة ادرس في مصر وإدارات الوافدين بالجامعات المصرية الحكومية بالدولار الأمريكي."
          />

          <div className="overflow-x-auto rounded-[24px] border border-[#132238]/10 bg-white shadow-sm">
            <table className="w-full text-right text-sm">
              <thead className="bg-[#F6F3EE] text-[#132238] border-b border-[#132238]/10 text-xs">
                <tr>
                  <th className="p-4 font-bold">بند الرسوم / المعاملة</th>
                  <th className="p-4 font-bold text-center">القيمة بالدولار</th>
                  <th className="p-4 font-bold">الجهة المستفيدة</th>
                  <th className="p-4 font-bold">توقيت السداد</th>
                  <th className="p-4 font-bold text-center">إلزامية البند</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#132238]/10 text-[#5B6878] text-xs sm:text-sm">
                {feeItems.map((fee) => (
                  <tr key={fee.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-[#132238]">{fee.serviceOrFee}</div>
                      <div className="text-[11px] text-[#5B6878] mt-0.5">{fee.notes}</div>
                    </td>
                    <td className="p-4 text-center font-mono font-black text-[#E8832A] text-base">
                      ${fee.amountUsd}
                    </td>
                    <td className="p-4 text-[#132238] font-medium text-xs">
                      {fee.payableTo}
                    </td>
                    <td className="p-4 text-[#5B6878] text-xs">
                      {fee.timing}
                    </td>
                    <td className="p-4 text-center">
                      {fee.isMandatory ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200">
                          إلزامي
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-[#5B6878] border border-slate-200">
                          حسب الحالة
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-[#F6F3EE] border border-[#132238]/10 text-xs text-[#5B6878] leading-relaxed text-right">
            ملاحظة تنظيمية: رسوم القيد الإجمالية محددة بـ 1500$، يسدد منها 500$ إلكترونياً عند تثبيت المقعد المبدئي، والباقي (1000$) يسدد لصالح الجامعة. علماً بأن جامعة القاهرة تشترط سداد الـ 1000$ فوراً بالبنك العربي الأفريقي عند تسليم الأوراق.
          </div>
        </div>
      </section>

      {/* The 70% Sudanese Scholarship Truth Section */}
      <section className="py-16 bg-[#F6F3EE] border-t border-[#132238]/10">
        <div className="max-w-[1000px] mx-auto px-6 space-y-6 text-right">
          <SectionHeading
            badge="منحة الطلاب السودانيين"
            title="قصة الرسوم وتعديل تخفيض الـ 70% منذ 2023"
            description="توضيح واقعي للحقوق المالية للطلاب السودانيين وشروط الحفاظ على الخصم الأكاديمي."
          />

          <div className="bg-white p-8 rounded-[28px] border border-[#132238]/10 shadow-sm space-y-6">
            <div className="flex items-start gap-4 pb-6 border-b border-[#132238]/10">
              <div className="p-3 rounded-2xl bg-[#E8832A]/10 text-[#E8832A] shrink-0">
                <Percent className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-[#132238]">
                  من تخفيض 90% التاريخي إلى تخفيض 70% الحالي
                </h3>
                <p className="text-sm text-[#5B6878] leading-[1.8] font-normal">
                  كان الطلاب السودانيون يتمتعون بخصم تاريخي 90%، ومنذ عام 2023 صدر قرار وزاري بتعديل التخفيض ليصبح 70% من المصروفات الدراسية المقررة بالدولار للوافدين. ورغم هذا التعديل، لا تزال مصر الخيار التعليمي الأقوى والأعلى قيمة وتصنيفاً مقارنة بجميع البدائل.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-5 rounded-2xl bg-[#FFF8F4] border border-[#E8832A]/30 space-y-2">
                <h4 className="font-bold text-rose-600 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  حالات فقدان خصم الـ 70%:
                </h4>
                <ul className="space-y-2 text-[#5B6878]">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                    <span>عند رسوب الطالب في أي سنة دراسية: يفقد الخصم في سنة الإعادة فقط ويسدد 100% بالدولار، ويعود له الخصم عند النجاح.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                    <span>عند طلب التحويل من جامعة خارجية إلى جامعة حكومية مصرية: تلغى المنحة فوراً ويعامل كوافد أجنبي كامل الرسوم.</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-[#F0FAF7] border border-emerald-200 space-y-2">
                <h4 className="font-bold text-emerald-700 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  كيف تحافظ على استمرار الخصم؟
                </h4>
                <ul className="space-y-2 text-[#5B6878]">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                    <span>الانتظام في الحضور والامتحانات وتفادي الرسوب الأكاديمي أو الانقطاع.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                    <span>تجديد الإقامة الدراسية والقيد الجامعي في المواعيد المقررة سنوياً.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Historical Acceptance Thresholds Table */}
      <section className="py-16 bg-white border-t border-[#132238]/10">
        <div className="max-w-[1050px] mx-auto px-6 space-y-6 text-right">
          <SectionHeading
            badge="مؤشرات التنسيق المعتمدة"
            title="الحدود الدنيا الاسترشادية للقبول بالكليات"
            description="مقارنة بين الجامعات الكبرى (القاهرة، عين شمس، الإسكندرية، المنصورة، أسيوط) والجامعات الإقليمية."
          />

          <div className="overflow-x-auto rounded-[24px] border border-[#132238]/10 bg-white shadow-sm">
            <table className="w-full text-right text-sm">
              <thead className="bg-[#F6F3EE] text-[#132238] border-b border-[#132238]/10 text-xs">
                <tr>
                  <th className="p-4 font-bold">الكلية / القطاع الأكاديمي</th>
                  <th className="p-4 font-bold text-center">الجامعات الكبرى</th>
                  <th className="p-4 font-bold text-center">الجامعات الإقليمية</th>
                  <th className="p-4 font-bold text-center">ملاحظات التنسيق</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#132238]/10 text-[#5B6878] text-xs sm:text-sm">
                {thresholdsData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-[#132238] flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-[#E8832A]" />
                      <span>{row.facultyName}</span>
                    </td>
                    <td className="p-4 text-center font-mono font-bold text-[#E8832A] text-base">
                      {row.majorUniversitiesMin}
                    </td>
                    <td className="p-4 text-center font-mono font-bold text-emerald-600 text-base">
                      {row.regionalUniversitiesMin}
                    </td>
                    <td className="p-4 text-center text-xs text-[#5B6878]">
                      تخفيض 5% لصالح كليات الأقاليم
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-[#F6F3EE] border border-[#132238]/10 text-xs text-[#5B6878] leading-relaxed">
            <span className="font-bold text-[#132238] block mb-1">إخلاء مسؤولية صريح:</span>
            النسب الموضحة أعلاه مستخرجة من ضوابط الأعوام السابقة لكليات الوافدين، وتعتمد النتيجة النهائية على عدد المتقدمين والمقاعد الشاغرة لكل جنسية وسرعة التقديم في كل موسم.
          </div>
        </div>
      </section>

      <WhatsAppFloatingButton />
    </div>
  );
}
