"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LandingPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Still loading
    
    if (status === "authenticated") {
      router.push("/reviews");
    } else {
      router.push("/home");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return <div>Redirecting...</div>;
}
