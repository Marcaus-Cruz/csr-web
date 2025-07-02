import type { Metadata } from "next";
import ClientSessionProvider from "./components/ClientSessionProvider";
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
        <ClientSessionProvider>
          <PageHeader />
          {children}
          <div className="page-bg" />
        </ClientSessionProvider>
      </body>
    </html>
  );
}
