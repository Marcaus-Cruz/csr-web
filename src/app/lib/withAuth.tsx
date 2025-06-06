'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

export const withAuth = (Component: React.ComponentType) => {
  const WithAuthComponent = (props: Record<string, unknown>) => {
    const router = useRouter();

    useEffect(() => {
      if (!isLoggedIn()) {
        router.push("/login"); // Redirect to login if not authenticated
      }
    }, [router]);

    return isLoggedIn() ? <Component {...props} /> : null;
  };

  WithAuthComponent.displayName = `WithAuth(${
    Component.displayName || Component.name || "Component"
  })`;

  return WithAuthComponent;
};

export const isLoggedIn = () => {
  return pb.authStore.isValid;
};
