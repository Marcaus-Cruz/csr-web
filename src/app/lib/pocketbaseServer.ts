import PocketBase from "pocketbase";
import { cookies } from "next/headers";

export const getServerPBUser = async () => {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("pb_auth");

  if (!authCookie) return null;

  const pb = new PocketBase("https://csr-web-pb.onrender.com");
  pb.authStore.loadFromCookie(`pb_auth=${authCookie.value}`);

  try {
    await pb.collection("users").authRefresh();

    return {
      user: pb.authStore.record,
      token: pb.authStore.token,
    };
  } catch {
    return null;
  }
};