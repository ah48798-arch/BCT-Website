"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { companyData } from "@/data/company";

export const WhatsAppFloatingButton: React.FC = () => {
  const cleanPhone = companyData.whatsapp.replace(/[^0-9]/g, "");
  const defaultMessage = encodeURIComponent(
    "السلام عليكم ورحمة الله، أود الحصول على استشارة فورية بشأن القبول والتسجيل في الجامعات المصرية عبر شركة بشدار"
  );

  return (
    <div className="fixed bottom-6 right-6 z-40 group">
      <a
        href={`https://wa.me/${cleanPhone}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-[#25d366] hover:bg-[#20ba59] text-white px-4 py-3.5 rounded-full shadow-2xl shadow-[#25d366]/40 hover:shadow-[#25d366]/60 transition-all duration-300 hover:scale-105"
        aria-label="تواصل فوري عبر واتساب"
      >
        <MessageCircle className="w-6 h-6 animate-pulse" />
        <span className="text-sm font-bold hidden sm:inline-block pr-0.5">
          استشرنا عبر واتساب
        </span>
      </a>
    </div>
  );
};
