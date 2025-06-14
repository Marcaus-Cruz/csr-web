"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ExistingAccountButton from "../components/ExistingAccountButton";
import { isLoggedIn } from "../lib/withAuth";
import "./homePage.css";

// TODO: New components - (containers), .page on layout container, options, error message

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
      <div className="container home">
        <h2 className="login-prompt prompt">
          Get ready to streamline your reviews
        </h2>
        <div className="options">
          <button className="btn btn-signup" onClick={handleClick("/signup")}>
            Sign Up
          </button>
          <ExistingAccountButton mightHaveExistingAccount={true} />
        </div>
      </div>
    </div>
  );
}
