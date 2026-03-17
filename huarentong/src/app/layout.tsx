import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "美国华人通 - 美国华人生活服务平台",
  description:
    "美国华人通是专为美国华人打造的一站式生活服务平台，提供新闻资讯、房产信息、二手交易、招聘求职、移民资讯、交友互动等服务。",
  keywords: "华人,美国华人,生活服务,房产,二手,招聘,移民,交友",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased min-h-screen flex flex-col">
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
