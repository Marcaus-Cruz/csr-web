"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    // TODO: logout of google
    router.push("/home"); // Redirect to login page after logout
  }, []);

  return <div>Logging you out...</div>;
}
