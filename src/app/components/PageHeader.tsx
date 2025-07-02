"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./pageHeader.css";

export default function PageHeader() {
  const router = useRouter();
  const session = useSession();

  const isAuthenticated = session.status === "authenticated";

  const buttonMap = isAuthenticated
    ? {
        reviews: "Reviews",
        create: "Create",
        hitlist: "Hitlist",
        logout: "Logout",
      }
    : {
        home: "Home",
        login: "Login",
        signup: "Sign Up",
      };

  return (
    <header>
      <button className="btn logo" onClick={() => router.push("home")}>
        <Image src="/logo-csr.png" alt="logo" fill={true} />
      </button>
      <nav className="nav">
        {Object.entries(buttonMap).map(([key, text]) => (
          <button
            className="btn standard"
            key={key}
            onClick={() =>
              key === "logout" ? signOut() : router.push(`/${key}`)
            }
          >
            {text}
          </button>
        ))}
      </nav>
    </header>
  );
}
