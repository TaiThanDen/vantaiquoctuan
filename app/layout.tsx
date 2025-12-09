import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import WrapperLayout from "./components/WrapperLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Vận Tải Tuấn Hải  - Dịch Vụ Vận Chuyển Chuyên Nghiệp | Chuyển Nhà, Hàng Tấn",
  description:
    "Vận Tải Tuấn Hải  - Đơn vị vận chuyển uy tín với hơn 20 năm kinh nghiệm. Chuyên vận chuyển hàng công nghiệp, chuyển nhà trọn gói, hàng tải trọng lớn (>2 tấn). Đội xe đa dạng từ 500kg đến 30 tấn. Phục vụ 24/7, an toàn - nhanh chóng - đúng hẹn.",
  keywords:
    "vận tải, vận chuyển hàng hóa, chuyển nhà, chuyển văn phòng, vận chuyển hàng công nghiệp, xe tải, thuê xe tải, vận chuyển nội thành, vận chuyển liên tỉnh, vận chuyển hàng nặng, logistics",
  authors: [{ name: "Vận Tải Tuấn Hải " }],
  openGraph: {
    title: "Vận Tải Tuấn Hải  - Vận Chuyển Chuyên Nghiệp",
    description:
      "Đơn vị vận tải uy tín chuyên vận chuyển hàng công nghiệp, chuyển nhà, hàng tải trọng lớn. Đội xe đa dạng, phục vụ 24/7.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/assets/logo_remove_bg-cropped.svg"
          type="image/svg+xml"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/@goongmaps/goong-js/dist/goong-js.css"
          rel="stylesheet"
        />
        <script src="https://cdn.jsdelivr.net/npm/@goongmaps/goong-js/dist/goong-js.js"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WrapperLayout />
        {children}
        <Footer />
      </body>
    </html>
  );
}
