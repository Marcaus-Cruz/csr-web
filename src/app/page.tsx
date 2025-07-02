"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  if (useSession().status === "authenticated") {
    router.push("/reviews");
  } else {
    router.push("/home");
  }

  return <div>Redirecting...</div>;
}
