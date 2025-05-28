"use client";

import PageHeader from "./PageHeader";
import { useState } from "react";

type PageKey = "home" | "reviews" | "create" | "edit" | "review";

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
      <PageHeader currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {children}
    </div>
  );
}
