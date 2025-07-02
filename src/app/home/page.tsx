"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import "./homePage.css";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="page home">
      <div className="user-container home">
        <h2 className="login-prompt prompt">
          Get ready to streamline your reviews
        </h2>
        <div className="options">
          <button className="btn btn-signup" onClick={() => signIn("google")}>
            Continue with Google
          </button>

          <div className="options-text text">
            Just came here to see the reviews?
          </div>
          <button
            className="btn btn-reviews"
            onClick={() => router.push("/reviews")}
          >
            See Reviews
          </button>
        </div>
      </div>
    </div>
  );
}
