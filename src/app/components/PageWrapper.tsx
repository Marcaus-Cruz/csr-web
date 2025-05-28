"use client";

import PageHeader from "./PageHeader";
import { useState } from "react";
import PageTitle from "./PageTitle";

type PageKey = "home" | "reviews" | "create" | "edit" | "review" | "landing";

export default function PageWrapper({
  children,
  currentPageName,
}: Readonly<{
  children: React.ReactNode;
  currentPageName: PageKey;
}>) {
  const [currentPage, setCurrentPage] = useState<PageKey>(currentPageName);

  return (
    <div className={`page ${currentPage}`}>
      <PageHeader setCurrentPage={setCurrentPage} />
      <PageTitle text={currentPage} />
      {children}
    </div>
  );
}
