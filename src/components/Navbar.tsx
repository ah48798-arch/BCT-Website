"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BctLogo } from "./BctLogo";
import {
  Menu,
  X,
  Sparkles,
  Home,
  Building2,
  GraduationCap,
  FileText,
  DollarSign,
  HelpCircle,
  Info,
  PhoneCall,
  MessageCircle,
} from "lucide-react";
import { companyData } from "@/data/company";

const navLinks = [
  { href: "/", label: "الرئيسية", icon: Home },
  { href: "/#about", label: "عن بشدار", icon: Info },
  { href: "/#services", label: "خدماتنا", icon: Sparkles },
  { href: "/#universities", label: "الجامعات", icon: Building2 },
  { href: "/#admissions", label: "مسار التقديم", icon: GraduationCap },
  { href: "/#requirements", label: "الشروط", icon: FileText },
  { href: "/#fees", label: "الرسوم والتنسيق", icon: DollarSign },
  { href: "/#contact", label: "تواصل معنا", icon: PhoneCall },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      id="site-header"
      className={`sticky top-0 z-40 w-full max-w-full bg-[#F6F3EE]/95 backdrop-blur-md border-b border-[#132238]/10 transition-all duration-300 ${
        scrolled ? "h-[74px] shadow-sm bg-white/95" : "h-[84px]"
      }`}
    >
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Official BCT Logo */}
        <div className="flex-shrink-0">
          <BctLogo size="md" variant="default" showLink={true} />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-bold text-[#132238]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link py-2 transition-colors duration-200 no-underline hover:text-[#E8832A] ${
                  isActive ? "text-[#E8832A] active font-extrabold" : "text-[#132238]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action CTA Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Interactive Start Journey Badge */}
          <Link
            href="/start"
            className="hidden xl:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#132238] bg-[#E8832A]/15 border border-[#E8832A]/30 hover:bg-[#E8832A]/25 transition-all no-underline"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E8832A]" />
            <span>المحطة التفاعلية</span>
          </Link>

          {/* Primary Consultation WhatsApp CTA */}
          <a
            href={`https://wa.me/${companyData.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("مرحباً شركة بشدار، أرغب بحجز استشارة جامعية للتقديم في الجامعات المصرية.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#E8832A] to-[#FF654F] hover:shadow-md transition-all hover:scale-105 active:scale-95 no-underline"
          >
            <MessageCircle className="w-4 h-4" />
            <span>احجز استشارتك</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
            className="p-2.5 rounded-xl bg-white border border-[#132238]/10 text-[#132238] hover:text-[#E8832A] focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-[#132238]/10 shadow-xl px-6 py-5 animate-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold no-underline transition-all ${
                    isActive
                      ? "text-[#E8832A] bg-[#E8832A]/10"
                      : "text-[#132238] hover:bg-slate-50"
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4 text-[#E8832A]" />}
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/start"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold text-[#132238] bg-[#E8832A]/15 border border-[#E8832A]/30 no-underline"
              >
                <Sparkles className="w-4 h-4 text-[#E8832A]" />
                <span>فتح المحطة التفاعلية (/start)</span>
              </Link>

              <a
                href={`https://wa.me/${companyData.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("مرحباً شركة بشدار، أرغب بحجز استشارة جامعية.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#E8832A] to-[#FF654F] no-underline shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>محادثة واتساب مباشرة (+201559259708)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
