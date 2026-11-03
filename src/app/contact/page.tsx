"use client";

import React, { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppFloatingButton } from "@/components/WhatsAppButton";
import { companyData } from "@/data/company";
import {
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Globe,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    countryOfCertificate: "السودان",
    certificateType: "الشهادة السودانية",
    percentage: "",
    desiredFaculty: "الطب البشري",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage("يرجى ملء الاسم ورقم الهاتف على الأقل للتواصل.");
      return;
    }

    setErrorMessage("");
    setSubmitted(true);

    const text = `السلام عليكم ورحمة الله،
أود تقديم طلب استشارة أكاديمية للقبول في مصر عبر شركة بشدار:
- الاسم: ${formData.name}
- الهاتف: ${formData.phone}
- دولة الشهادة: ${formData.countryOfCertificate}
- نوع الشهادة: ${formData.certificateType}
- النسبة المئوية: ${formData.percentage || "لم تذكر"}
- الكلية المستهدفة: ${formData.desiredFaculty}
- ملاحظات إضافية: ${formData.notes || "لا توجد"}`;

    const cleanPhone = companyData.whatsapp.replace(/[^0-9]/g, "");
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;

    window.open(waUrl, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F3EE] text-[#132238]">

      {/* Header Banner */}
      <section className="pt-32 pb-16 bg-[#F6F3EE] border-b border-[#132238]/10 relative overflow-hidden">
        <div className="max-w-[1180px] mx-auto px-6 text-right">
          <div className="flex items-center gap-3 text-[#E8832A] text-[13px] font-bold mb-3">
            <span className="w-[22px] h-[2px] bg-[#E8832A] inline-block" />
            <span>تواصل مباشر مع مستشاري BCT</span>
          </div>
          <h1 className="text-[32px] sm:text-[44px] font-black text-[#132238] tracking-tight">
            تواصل معنا وابدأ مستقبلك بلغة النجاح
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#5B6878] max-w-2xl font-normal">
            يسعدنا استقبالكم في مقرنا بالدقي بجوار السفارة السودانية، أو الرد على استفساراتكم الهاتفية وعبر واتساب على مدار الساعة.
          </p>
        </div>
      </section>

      {/* Main Grid: Info + Form */}
      <section className="py-20 bg-white">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Right Column: Contact Cards */}
            <div className="lg:col-span-5 space-y-6 text-right">
              <div className="bg-[#F6F3EE] p-7 sm:p-9 rounded-[28px] border border-[#132238]/10 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-[#132238] pb-3 border-b border-[#132238]/10">
                  بيانات المقر الرئيسي
                </h3>

                <div className="space-y-5 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#E8832A]/10 text-[#E8832A] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#132238]">العنوان الميداني:</h4>
                      <p className="text-xs text-[#5B6878] mt-1 leading-relaxed">
                        {companyData.addressDetailed}
                      </p>
                      <span className="inline-block mt-1 text-xs text-[#E8832A] font-bold">
                        علامة مميزة: {companyData.landmark}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#E8832A]/10 text-[#E8832A] flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#132238]">هواتف الاستشارات والتقديم:</h4>
                      <div className="flex flex-col gap-1 mt-1 text-xs font-mono" dir="ltr">
                        {companyData.phones.map((phone, i) => (
                          <a
                            key={i}
                            href={`tel:${phone}`}
                            className="text-[#132238] hover:text-[#E8832A] transition-colors"
                          >
                            {phone}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#E8832A]/10 text-[#E8832A] flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#132238]">مواعيد استقبال الطلاب والملفات:</h4>
                      <p className="text-xs text-[#5B6878] mt-1 leading-relaxed">
                        السبت إلى الخميس: من 10:00 صباحاً حتى 6:00 مساءً بتوقيت القاهرة
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#E8832A]/10 text-[#E8832A] flex items-center justify-center shrink-0 mt-0.5">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#132238]">الموقع الإلكتروني الرسمي:</h4>
                      <a
                        href={companyData.officialBrochureWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#5B6878] hover:text-[#132238] underline underline-offset-4 mt-1 block"
                      >
                        {companyData.officialBrochureWebsite}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#132238]/10">
                  <a
                    href={`https://wa.me/${companyData.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-white bg-[#25d366] hover:bg-[#20ba59] text-sm shadow-md transition-all"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>محادثة واتساب مباشرة مع المستشار</span>
                  </a>
                </div>
              </div>

              {/* Legal Badge Card */}
              <div className="p-5 rounded-2xl bg-[#F6F3EE] border border-[#132238]/10 text-xs text-[#5B6878] space-y-2">
                <div className="flex items-center justify-between text-[#132238] font-mono">
                  <span>سجل تجاري: {companyData.commercialReg}</span>
                  <span>بطاقة ضريبية: {companyData.taxNumber}</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  شركة بشدار للاستشارات والتدريب مسجلة وفقاً لأحكام القوانين المصرية المنظمة لشركات الاستشارات والتدريب.
                </p>
              </div>
            </div>

            {/* Left Column: Interactive Consultation Form */}
            <div className="lg:col-span-7">
              <div className="bg-[#F6F3EE] p-7 sm:p-10 rounded-[28px] border border-[#132238]/10 shadow-sm space-y-6 text-right">
                <div className="border-b border-[#132238]/10 pb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#132238]">
                    طلب استشارة وتقييم قبول أكاديمي
                  </h3>
                  <p className="text-xs text-[#5B6878] mt-1">
                    أدخل بياناتك ليقوم مستشارنا الأكاديمي بدراسة ملفك واحتساب نسبتك ومساعدتك في التقديم فوراً
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {submitted && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>تم تجهيز طلبك وفتح نافذة واتساب للتواصل المباشر مع مستشارنا!</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#132238] font-semibold mb-1.5">
                        اسم الطالب ثلاثياً <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="أدخل اسم الطالب كما في الجواز"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-3.5 rounded-2xl bg-white border border-[#132238]/15 text-[#132238] placeholder-[#5B6878] focus:outline-none focus:border-[#E8832A]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#132238] font-semibold mb-1.5">
                        رقم الهاتف / واتساب <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="مثال: 201559259708+"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-3.5 rounded-2xl bg-white border border-[#132238]/15 text-[#132238] placeholder-[#5B6878] focus:outline-none focus:border-[#E8832A]"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[#132238] font-semibold mb-1.5">
                        دولة الشهادة
                      </label>
                      <select
                        value={formData.countryOfCertificate}
                        onChange={(e) => setFormData({ ...formData, countryOfCertificate: e.target.value })}
                        className="w-full p-3.5 rounded-2xl bg-white border border-[#132238]/15 text-[#132238] focus:outline-none focus:border-[#E8832A]"
                      >
                        <option value="السودان">السودان</option>
                        <option value="السعودية">السعودية</option>
                        <option value="الإمارات">الإمارات</option>
                        <option value="الكويت / قطر / عمان">الخليج الأخرى</option>
                        <option value="مصر">مصر</option>
                        <option value="شهادة دولية IGCSE / SAT">شهادة دولية</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#132238] font-semibold mb-1.5">
                        نوع الشهادة
                      </label>
                      <select
                        value={formData.certificateType}
                        onChange={(e) => setFormData({ ...formData, certificateType: e.target.value })}
                        className="w-full p-3.5 rounded-2xl bg-white border border-[#132238]/15 text-[#132238] focus:outline-none focus:border-[#E8832A]"
                      >
                        <option value="الشهادة السودانية (أعوام مؤجلة)">ثانوية سودانية (مؤجلة)</option>
                        <option value="الشهادة السودانية القديمة">ثانوية سودانية (قديمة)</option>
                        <option value="شهادة المسارات السعودية">مسارات سعودية</option>
                        <option value="شهادة مقررات سعودية">مقررات سعودية</option>
                        <option value="ثانوية عامة خليجية">ثانوية عامة خليجية</option>
                        <option value="IGCSE / بريطانية">IGCSE بريطانية</option>
                        <option value="دبلومة أمريكية">دبلومة أمريكية</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#132238] font-semibold mb-1.5">
                        النسبة المئوية التقريبية
                      </label>
                      <input
                        type="text"
                        placeholder="مثال: 78.5%"
                        value={formData.percentage}
                        onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
                        className="w-full p-3.5 rounded-2xl bg-white border border-[#132238]/15 text-[#132238] placeholder-[#5B6878] focus:outline-none focus:border-[#E8832A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#132238] font-semibold mb-1.5">
                      الكلية أو التخصص المستهدف
                    </label>
                    <select
                      value={formData.desiredFaculty}
                      onChange={(e) => setFormData({ ...formData, desiredFaculty: e.target.value })}
                      className="w-full p-3.5 rounded-2xl bg-white border border-[#132238]/15 text-[#132238] focus:outline-none focus:border-[#E8832A]"
                    >
                      <option value="الطب البشري">الطب البشري</option>
                      <option value="طب الأسنان">طب الأسنان</option>
                      <option value="الصيدلة">الصيدلة</option>
                      <option value="العلاج الطبيعي">العلاج الطبيعي</option>
                      <option value="الهندسة">الهندسة</option>
                      <option value="الحاسبات والذكاء الاصطناعي">الحاسبات والذكاء الاصطناعي</option>
                      <option value="الاقتصاد والعلوم السياسية">الاقتصاد والعلوم السياسية</option>
                      <option value="الإعلام / الألسن">الإعلام / الألسن</option>
                      <option value="كليات أخرى">كليات وتخصصات أخرى</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#132238] font-semibold mb-1.5">
                      أي استفسار أو ملاحظات خاصة
                    </label>
                    <textarea
                      rows={3}
                      placeholder="اكتب أي استفسار حول الجامعات المفضلة أو التوثيق أو السكن..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full p-3.5 rounded-2xl bg-white border border-[#132238]/15 text-[#132238] placeholder-[#5B6878] focus:outline-none focus:border-[#E8832A]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-full font-bold text-white bg-[#E8832A] hover:bg-[#D4721A] shadow-md shadow-[#E8832A]/20 transition-all flex items-center justify-center gap-2 text-sm sm:text-base hover:scale-[1.01]"
                    >
                      <Send className="w-5 h-5" />
                      <span>إرسال الطلب والانتقال للاستشارة الفورية عبر واتساب</span>
                    </button>
                    <p className="text-[11px] text-[#5B6878] mt-2 text-center font-normal">
                      * يفتح الرابط محادثة واتساب رسمية ومجهزة بكافة بياناتك لخدمتك فوراً دون انتظار.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppFloatingButton />
    </div>
  );
}
