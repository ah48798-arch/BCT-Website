import type { Metadata, Viewport } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SudaneseRobotAssistant } from "@/components/SudaneseRobotAssistant";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#132238",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "شركة بشدار للاستشارات والتدريب | BCT — شريككم في النجاح الأكاديمي والمهني",
  description:
    "شركة بشدار للاستشارات والتدريب (BCT) — بوابتك الموثوقة للقبول والتسجيل في الجامعات المصرية الحكومية للطلاب الوافدين والسودانيين. استشارات، توثيق، ومتابعة القبول.",
  keywords: [
    "بشدار للاستشارات والتدريب",
    "BCT",
    "الجامعات المصرية الحكومية",
    "ادرس في مصر للوافدين",
    "قبول الطلاب السودانيين في مصر",
    "توثيق الشهادة الثانوية",
  ],
  authors: [{ name: "شركة بشدار للاستشارات والتدريب" }],
  openGraph: {
    title: "شركة بشدار للاستشارات والتدريب | BCT",
    description: "شريككم في النجاح الأكاديمي والمهني — بوابتكم الموثوقة للجامعات المصرية",
    type: "website",
    locale: "ar_EG",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="h-full scroll-smooth overflow-x-hidden">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Noto+Kufi+Arabic:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F6F3EE] text-[#132238] font-sans antialiased selection:bg-[#E8832A] selection:text-white overflow-x-hidden w-full max-w-full">
        <Navbar />
        <main className="flex-1 w-full max-w-full overflow-x-hidden">{children}</main>
        <Footer />
        <SudaneseRobotAssistant />
      </body>
    </html>
  );
}
