"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export const isLoggedIn = () => useSession().status === "authenticated";

export const withAuth = (Component: React.ComponentType) => {
  const WithAuthComponent = (props: Record<string, unknown>) => {
    const router = useRouter();

    useEffect(() => {
      if (isLoggedIn()) {
        router.push("/home"); // Redirect to login if not authenticated
      }
    }, [router]);

    return isLoggedIn() ? <Component {...props} /> : null;
  };

  WithAuthComponent.displayName = `WithAuth(${
    Component.displayName || Component.name || "Component"
  })`;

  return WithAuthComponent;
};
