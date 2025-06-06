"use client";

import { useRouter } from "next/navigation";
import { isLoggedIn } from "../lib/withAuth";

export default function HomePage() {
  const router = useRouter();
  const handleClick = (route: string) => () => {
    router.push(route);
  };

  return isLoggedIn() ? (
    <div>Home</div>
  ) : (
    <div>
      <button className="btn btn-signup" onClick={handleClick("/signup")}>
        Sign Up
      </button>
      <div>Already have an account?</div>
      <button className="btn btn-login" onClick={handleClick("/login")}>
        Login instead
      </button>
    </div>
  );
}
