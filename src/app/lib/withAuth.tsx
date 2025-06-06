import { useEffect } from "react";
import { useRouter } from "next/router";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

export const withAuth = (Component: React.ComponentType) => {
  const WithAuthComponent = (props: Record<string, unknown>) => {
    const router = useRouter();

    useEffect(() => {
      if (!pb.authStore.isValid) {
        router.push("/login"); // Redirect to login if not authenticated
      }
    }, [router]);

    return pb.authStore.isValid ? <Component {...props} /> : null;
  };

  WithAuthComponent.displayName = `WithAuth(${
    Component.displayName || Component.name || "Component"
  })`;

  return WithAuthComponent;
};
