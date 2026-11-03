import React from "react";
import Link from "next/link";
import { BctLogo } from "./BctLogo";
import { companyData } from "@/data/company";
import {
  Phone,
  MapPin,
  Globe,
  FileCheck2,
  ShieldCheck,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#132238] border-t border-white/10 pt-16 pb-12 text-[#A3B0BF]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1: Identity & Legal Numbers */}
          <div className="flex flex-col gap-4 text-right">
            <BctLogo size="lg" variant="white" />
            <p className="text-xs sm:text-sm text-white/70 leading-[1.8] font-normal">
              {companyData.description}
            </p>

            {/* Official Legal Numbers */}
            <div className="mt-2 p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
              <div className="flex items-center justify-between text-white">
                <span className="flex items-center gap-1.5 font-medium text-white/70">
                  <ShieldCheck className="w-4 h-4 text-[#E8832A]" />
                  السجل التجاري:
                </span>
                <span className="font-mono font-bold tracking-wider">
                  {companyData.commercialReg}
                </span>
              </div>
              <div className="flex items-center justify-between text-white">
                <span className="flex items-center gap-1.5 font-medium text-white/70">
                  <FileCheck2 className="w-4 h-4 text-[#E8832A]" />
                  البطاقة الضريبية:
                </span>
                <span className="font-mono font-bold tracking-wider">
                  {companyData.taxNumber}
                </span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="flex flex-col gap-3 text-right">
            <h4 className="text-sm font-bold text-white border-r-2 border-[#E8832A] pr-3">
              دليل القبول والجامعات
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm mt-1">
              <li>
                <Link
                  href="/universities"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#E8832A]" />
                  دليل الجامعات المصرية الـ 26
                </Link>
              </li>
              <li>
                <Link
                  href="/admissions"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#E8832A]" />
                  مراحل التقديم على «ادرس في مصر»
                </Link>
              </li>
              <li>
                <Link
                  href="/requirements"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#E8832A]" />
                  شروط وتوثيق الشهادات الثانوية
                </Link>
              </li>
              <li>
                <Link
                  href="/fees"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#E8832A]" />
                  جداول الرسوم ونسب التنسيق
                </Link>
              </li>
              <li>
                <Link
                  href="/student-guide"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#E8832A]" />
                  الإقامة الدراسية والأسئلة الشائعة
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services from Brochure */}
          <div className="flex flex-col gap-3 text-right">
            <h4 className="text-sm font-bold text-white border-r-2 border-[#E8832A] pr-3">
              خدمات شركة بشدار
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm mt-1 text-white/70">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8832A]" />
                التقديمات الجامعية للوافدين
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8832A]" />
                توثيق ومعادلة الأوراق والشهادات
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8832A]" />
                متابعة القبول والترشيح المبدئي والنهائي
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8832A]" />
                استخراج خطابات السفارات والإفادات
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8832A]" />
                إصدار وتجديد الشهادات الثانوية
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8832A]" />
                الاستشارات التعليمية واختيار التخصص
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Contacts */}
          <div className="flex flex-col gap-3 text-right">
            <h4 className="text-sm font-bold text-white border-r-2 border-[#E8832A] pr-3">
              المقر وأرقام التواصل
            </h4>
            <div className="space-y-3 text-xs sm:text-sm mt-1">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E8832A] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">{companyData.address}</p>
                  <p className="text-[11px] text-[#E8832A] mt-0.5 font-bold">
                    {companyData.landmark}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#E8832A] shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1 font-mono" dir="ltr">
                  {companyData.phones.map((phone, i) => (
                    <a
                      key={i}
                      href={`tel:${phone}`}
                      className="text-white hover:text-[#E8832A] transition-colors"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#E8832A] shrink-0" />
                <a
                  href={companyData.officialBrochureWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white/70 hover:text-white underline underline-offset-4"
                >
                  bct-consulting-sudan.com
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${companyData.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#25d366] hover:bg-[#20ba59] transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>محادثة واتساب فورية</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Compliance & Disclaimer */}
        <div className="pt-8 pb-4 text-xs text-white/50 space-y-3 leading-relaxed text-right">
          <p className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <span className="font-bold text-white block mb-1">
              إخلاء مسؤولية تنظيمي وقانوني:
            </span>
            شركة بشدار للاستشارات والتدريب (BCT) هي شركة استشارية خاصة معتمدة (س.ت: 226285 - ب.ض: 274-135-760)، تقدم خدمات الإرشاد والمساعدة الفنية واللوجستية للطلاب الوافدين. الشركة ليست جهة حكومية أو ممثلاً رسمياً لمنصة «ادرس في مصر» أو الإدارة المركزية لشؤون الطلاب الوافدين أو وزارة التعليم العالي والبحث العلمي المصرية. كافة نسب القبول والرسوم المعروضة هي أمثلة استرشادية مبنية على ضوابط الأعوام السابقة وتخضع للتحديث السنوي بقرارات مكتب التنسيق المصري.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/40 pt-4 border-t border-white/10">
            <p>
              جميع الحقوق محفوظة © {new Date().getFullYear()} شركة بشدار للاستشارات والتدريب — BCT
            </p>
            <p className="mt-2 sm:mt-0 font-medium text-white/70">
              «شريككم في النجاح الأكاديمي والمهني»
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
