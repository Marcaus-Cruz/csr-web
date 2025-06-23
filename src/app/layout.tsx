import type { Metadata } from "next";
import PageHeader from "./components/PageHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "CSR Web App",
  description: "Create chicken sandwich reviews",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>

        <PageHeader />
        {children}
        <div className="page-bg" />
      </body>
    </html>
  );
}
