import React from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppFloatingButton } from "@/components/WhatsAppButton";
import { servicesData } from "@/data/services";
import { companyData } from "@/data/company";
import {
  GraduationCap,
  FileCheck,
  ClipboardCheck,
  MailCheck,
  Award,
  Compass,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";

export const metadata = {
  title: "خدماتنا الأكاديمية والاستشارية | BCT بشدار",
  description:
    "استعرض خدمات شركة بشدار للاستشارات والتدريب: التقديمات الجامعية، توثيق ومعادلة الشهادات، متابعة القبول، خطابات السفارات، وإصدار الشهادات الثانوية.",
};

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  FileCheck,
  ClipboardCheck,
  MailCheck,
  Award,
  Compass,
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F3EE] text-[#132238]">

      {/* Header Banner */}
      <section className="pt-32 pb-16 bg-[#F6F3EE] border-b border-[#132238]/10 relative overflow-hidden">
        <div className="max-w-[1180px] mx-auto px-6 text-right">
          <div className="flex items-center gap-3 text-[#E8832A] text-[13px] font-bold mb-3">
            <span className="w-[22px] h-[2px] bg-[#E8832A] inline-block" />
            <span>الخدمات الميدانية المعتمدة</span>
          </div>
          <h1 className="text-[32px] sm:text-[44px] font-black text-[#132238] tracking-tight">
            خدماتنا الأكاديمية واللوجستية المتكاملة
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#5B6878] max-w-2xl font-normal">
            حلول متكاملة تضمن إتمام إجراءات القبول والتسجيل وتوثيق الأوراق وتفادي الأخطاء الإدارية والمالية.
          </p>
        </div>
      </section>

      {/* Services Full List */}
      <section className="py-20 bg-white">
        <div className="max-w-[1180px] mx-auto px-6 space-y-12">
          {servicesData.map((service, index) => {
            const Icon = iconMap[service.icon] || Compass;
            return (
              <div
                key={service.id}
                id={service.id}
                className="bg-[#F6F3EE] p-8 sm:p-10 rounded-[28px] border border-[#132238]/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start scroll-mt-28"
              >
                {/* Left/Col 1: Title & Overview */}
                <div className="lg:col-span-7 space-y-4 text-right">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#E8832A]/15 border border-[#E8832A]/30 flex items-center justify-center text-[#E8832A]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-[#E8832A]">
                        الخدمة رقم 0{index + 1}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-[#132238]">
                        {service.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-[#5B6878] leading-[1.9] font-normal">
                    {service.fullDesc}
                  </p>

                  <div className="pt-2">
                    <h4 className="text-xs font-bold text-[#132238] mb-2 uppercase tracking-wider">
                      المستفيدون والجمهور المستهدف:
                    </h4>
                    <p className="text-xs text-[#E8832A] font-semibold bg-white p-3.5 rounded-xl border border-[#132238]/5">
                      {service.targetAudience}
                    </p>
                  </div>
                </div>

                {/* Right/Col 2: Deliverables & CTA */}
                <div className="lg:col-span-5 bg-white p-6 rounded-[22px] border border-[#132238]/10 space-y-4 text-right">
                  <h4 className="text-sm font-bold text-[#132238] pb-2 border-b border-[#132238]/10">
                    مخرجات ومزايا الخدمة:
                  </h4>
                  <ul className="space-y-2.5">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="text-xs text-[#5B6878] flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#E8832A] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3">
                    <a
                      href={`https://wa.me/${companyData.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                        `السلام عليكم، أود طلب خدمة: ${service.title} عبر شركة بشدار`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-full font-bold text-white bg-[#E8832A] hover:bg-[#D4721A] text-xs transition-all shadow-md"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>طلب هذه الخدمة عبر واتساب</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <WhatsAppFloatingButton />
    </div>
  );
}
