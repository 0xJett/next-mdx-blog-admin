import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import MainLayout from "@/components/main-layout/main-layout";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next MDX Blog Admin",
  description: "Content management system for Next MDX Blog",
  authors: [{ name: "0xJett", url: "https://github.com/0xJett" }],
};

export const viewport: Viewport = {
  userScalable: false,
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-svh overflow-hidden w-screen`}
      >
        <Providers>
          <Header />
          <MainLayout>{children}</MainLayout>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
