"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isLoggedIn } from "../lib/withAuth";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn()) {
      router.push("/reviews");
    }
  }, [router]);

  const handleClick = (route: string) => () => {
    router.push(route);
  };

  return (
    <div className="page not-logged-in">
      <div className="login-prompt">Sign in to start making reviews.</div>
      <div className="login-options">
        <button className="btn btn-signup" onClick={handleClick("/signup")}>
          Sign Up
        </button>
        <div>Already have an account?</div>
        <button className="btn btn-login" onClick={handleClick("/login")}>
          Login instead
        </button>
      </div>
    </div>
  );
}