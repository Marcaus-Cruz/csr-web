"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { clientIsLoggedIn } from "../lib/pocketbaseClient";
import "./pageHeader.css";

export default function PageHeader() {
  const router = useRouter();
  const pathname = usePathname();

  console.log({ pathname });

  const buttonMap = clientIsLoggedIn()
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

  function handleLoggedIn(pageName: string) {
    router.push(`/${pageName}`);
  }

  return (
    <header>
      <button className="btn logo" onClick={() => handleLoggedIn("home")}>
        <Image src="/logo-csr.png" alt="logo" fill={true} />
      </button>
      <nav className="nav">
        {Object.entries(buttonMap).map(([key, text]) => (
          <button
            className="btn standard"
            key={key}
            onClick={() => handleLoggedIn(key)}
          >
            {text}
          </button>
        ))}
      </nav>
    </header>
  );
}
