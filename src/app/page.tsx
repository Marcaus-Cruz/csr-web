"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "./lib/withAuth";

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn()) {
      router.push("/reviews");
    } else {
      router.push("/home");
    }
  }, [router]);

  return <div>Redirecting...</div>;
}