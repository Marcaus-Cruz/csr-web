"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isLoggedIn } from "../lib/withAuth";
import "./homePage.css";

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
      <div className="container login">
        <div className="login-prompt">Sign up and streamline your reviews</div>
        <div className="login-options">
          <button className="btn btn-signup" onClick={handleClick("/signup")}>
            Sign Up
          </button>
          <div>Already have an account?</div>
          <button className="btn btn-login" onClick={handleClick("/login")}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
