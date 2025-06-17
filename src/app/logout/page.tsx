"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import pb from "../lib/pocketbaseClient";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    pb.authStore.clear(); // Clears authentication data
    router.push("/home"); // Redirect to login page after logout
  }, []);

  return <div>Logging you out...</div>;
}
