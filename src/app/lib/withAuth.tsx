"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export const withAuth = (Component: React.ComponentType) => {
  const WithAuthComponent = (props: Record<string, unknown>) => {
    const { status } = useSession();
    const router = useRouter();
    const isLoggedIn = status === "authenticated";

    useEffect(() => {
      if (!isLoggedIn && status !== "loading") {
        router.push("/home"); // Redirect to login if not authenticated
      }
    }, [isLoggedIn, status, router]);

    if (status === "loading") {
      return <div>Loading...</div>;
    }

    return isLoggedIn ? <Component {...props} /> : null;
  };

  WithAuthComponent.displayName = `WithAuth(${
    Component.displayName || Component.name || "Component"
  })`;

  return WithAuthComponent;
};
