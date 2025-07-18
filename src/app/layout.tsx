import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";
import { Clock } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI-VUE",
  icons: {
    icon: "/f.ico",
  },
  description:
    "AI Interviewee is your intelligent virtual mock interview assistant, built to simulate real interview experiences and help you prepare confidently for any job role. Whether you're aiming for tech giants or startups, AI Interviewee adapts to your domain, analyzes your answers, and gives constructive feedback — anytime, anywhere.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable}  antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
