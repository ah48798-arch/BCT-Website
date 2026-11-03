import React from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppFloatingButton } from "@/components/WhatsAppButton";
import { companyData } from "@/data/company";
import {
  ShieldCheck,
  FileCheck2,
  Building2,
  Compass,
  Users2,
  PhoneCall,
  AlertTriangle,
} from "lucide-react";

export const metadata = {
  title: "عن شركة بشدار للاستشارات والتدريب | BCT",
  description:
    "تعرف على شركة بشدار للاستشارات والتدريب، هويتنا المؤسسية، سجلنا التجاري وترخيصنا، ومهمتنا في قيادة الطلاب الوافدين نحو القبول الجامعي الموثوق بمصر.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F3EE] text-[#132238]">

      {/* Header Banner */}
      <section className="pt-32 pb-16 bg-[#F6F3EE] border-b border-[#132238]/10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <span className="absolute -left-[150px] -top-[150px] w-[350px] h-[350px] rounded-full border border-[#31B7A6]/30" />
        </div>

        <div className="max-w-[1180px] mx-auto px-6 text-right relative z-10">
          <div className="flex items-center gap-3 text-[#E8832A] text-[13px] font-bold mb-3">
            <span className="w-[22px] h-[2px] bg-[#E8832A] inline-block" />
            <span>الهوية والرسالة المؤسسية</span>
          </div>
          <h1 className="text-[32px] sm:text-[44px] font-black text-[#132238] tracking-tight">
            عن شركة بشدار للاستشارات والتدريب
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#5B6878] max-w-2xl font-normal">
            «{companyData.tagline}» — بيت الخبرة الاستشارية المتخصصة في القبول بالجامعات المصرية وتوثيق ومعادلة الشهادات.
          </p>
        </div>
      </section>

      {/* Main Narrative & Values */}
      <section className="py-20 bg-white">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Story & Scope */}
            <div className="lg:col-span-7 space-y-6 text-right">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#132238]">
                من نحن وماذا نقدم لطلابنا؟
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-[#5B6878] leading-[1.9] font-normal">
                <p>
                  تأسست <strong className="text-[#132238]">شركة بشدار للاستشارات والتدريب (BCT)</strong> كمؤسسة استشارية قانونية معتمدة برؤية ترتكز على إزالة كافة العوائق والتعقيدات الإدارية أمام الطلاب الوافدين الراغبين في استكمال دراستهم الجامعية في جمهورية مصر العربية.
                </p>
                <p>
                  نعمل كحلقة وصل خبيرة وموثوقة بين الطالب ومنظومة التعليم العالي المصري، بدءاً من دراسة درجات الشهادة الثانوية وتحديد الكليات المتاحة، وهندسة ترتيب الرغبات الـ 10 على المنصة الرسمية بذكاء، وصولاً إلى استيفاء سلسلة توثيق الأوراق من الوزارات والسفارات، ومرافقة الطالب في تسليم الملف الورقي الأصلي بالجامعة واستخراج الإقامة الدراسية.
                </p>
                <p>
                  نؤمن بالشفافية المطلقة؛ لذلك لا نطلق وعوداً وهمية، ولا ندّعي نسب قبول غير حقيقية، بل نضع بين يدي الطالب وولي أمره الحقائق الميدانية كما هي، لحمايتهم من الأخطاء المالية والإدارية القاتلة التي قد تؤدي لضياع الرسوم أو فقدان المنحة.
                </p>
              </div>

              {/* Pillars */}
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 rounded-[20px] bg-[#F6F3EE] border border-[#132238]/10 space-y-2">
                  <Compass className="w-5 h-5 text-[#E8832A] mb-1" />
                  <h4 className="font-bold text-[#132238] text-base">الشفافية والمصداقية</h4>
                  <p className="text-xs text-[#5B6878] leading-relaxed">
                    تقديم استشارات صادقة تحمي الطالب من أخطاء التحويل وإلغاء المنح وحجب الرغبات.
                  </p>
                </div>

                <div className="p-6 rounded-[20px] bg-[#F6F3EE] border border-[#132238]/10 space-y-2">
                  <Users2 className="w-5 h-5 text-[#E8832A] mb-1" />
                  <h4 className="font-bold text-[#132238] text-base">المرافقة الميدانية</h4>
                  <p className="text-xs text-[#5B6878] leading-relaxed">
                    فريق عمل متواجد على الأرض بالقاهرة ومحافظات مصر لإنهاء المعاملات وتسليم الأصول.
                  </p>
                </div>
              </div>
            </div>

            {/* Official Credentials Sidebar */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#F6F3EE] p-7 sm:p-8 rounded-[28px] border border-[#132238]/10 shadow-sm space-y-6 text-right">
                <h3 className="text-lg font-bold text-[#132238] pb-3 border-b border-[#132238]/10">
                  بيانات التوثيق والسجل التجاري
                </h3>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-[#132238]/10">
                    <span className="flex items-center gap-2 text-[#5B6878] font-semibold">
                      <ShieldCheck className="w-4 h-4 text-[#E8832A]" />
                      رقم السجل التجاري:
                    </span>
                    <span className="font-mono font-bold text-[#132238] tracking-widest">
                      {companyData.commercialReg}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-[#132238]/10">
                    <span className="flex items-center gap-2 text-[#5B6878] font-semibold">
                      <FileCheck2 className="w-4 h-4 text-[#E8832A]" />
                      رقم البطاقة الضريبية:
                    </span>
                    <span className="font-mono font-bold text-[#132238] tracking-widest">
                      {companyData.taxNumber}
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-[#132238]/10">
                    <Building2 className="w-4 h-4 text-[#E8832A] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#132238] block">مقر الشركة الميداني:</span>
                      <span className="text-xs text-[#5B6878] block mt-1">
                        {companyData.address}
                      </span>
                      <span className="text-xs text-[#E8832A] font-bold block mt-0.5">
                        {companyData.landmark}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={`https://wa.me/${companyData.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-white bg-[#E8832A] hover:bg-[#D4721A] text-sm shadow-md transition-all"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>تحدث مع مستشار معتمد الآن</span>
                  </a>
                </div>
              </div>

              {/* Regulatory Caveat Notice */}
              <div className="p-5 rounded-[22px] bg-[#FFF8F4] border border-[#E8832A]/30 text-xs text-[#5B6878] space-y-2 leading-relaxed text-right">
                <div className="flex items-center gap-2 font-bold text-[#132238]">
                  <AlertTriangle className="w-4 h-4 text-[#E8832A]" />
                  <span>تنويه قانوني واستشاري:</span>
                </div>
                <p>
                  شركة بشدار للاستشارات والتدريب هي جهة استشارية خاصة وليست جهة حكومية أو تمثيلاً رسمياً لمنصة «ادرس في مصر». نحن نساعدك في إجراءات التقديم والتوجيه السليم، والقرار النهائي للقبول يعود دائماً للقواعد المعتمدة بمكتب التنسيق المصري.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppFloatingButton />
    </div>
  );
}
