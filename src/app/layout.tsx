import type { Metadata } from "next";
import "./globals.css";
import { getServerPBUser } from "./lib/pocketbaseServer";
import AuthHydrationScript from "./components/AuthHydrationScript";
import PageHeader from "./components/PageHeader";

export const metadata: Metadata = {
  title: "CSR Web App",
  description: "Create chicken sandwich reviews",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authData = await getServerPBUser();

  return (
    <html lang="en">
      <body>
        {/* Inject a script that hydrates PocketBase client on the browser */}
        <AuthHydrationScript authData={authData} />

        <PageHeader />
        {children}
        <div className="page-bg" />
      </body>
    </html>
  );
}
