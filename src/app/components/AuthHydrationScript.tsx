"use client";

import { useEffect } from "react";
import POCKETBASE_CLIENT from "../lib/pocketbaseClient";

type AuthHydrationScriptProps = {
  authData: {
    user: any;
    token: string;
  } | null;
};

export default function AuthHydrationScript({ authData }: AuthHydrationScriptProps) {
  useEffect(() => {
    if (authData?.token) {
      POCKETBASE_CLIENT.authStore.save(authData.token, authData.user);
    } else {
      POCKETBASE_CLIENT.authStore.clear();
    }
  }, [authData]);

  return null;
}
