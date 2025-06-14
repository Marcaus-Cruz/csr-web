import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import PageHeader from "./components/PageHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CSR Web App",
  description: "Create chicken sandwich reviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body className={`${geistSans.variable} ${geistMono.variable}`}> */}
      <body>
        <PageHeader />
        <div className="page-bg" />
        {children}
      </body>
    </html>
  );
}
