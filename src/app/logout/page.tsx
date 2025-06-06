"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    pb.authStore.clear(); // Clears authentication data
    router.push("/home"); // Redirect to login page after logout
  }, []);

  return <div>Logging you out...</div>;
}
