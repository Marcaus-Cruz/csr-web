"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { isLoggedIn } from "../lib/withAuth";
import "./pageHeader.css";

function getKeysToButtonText(): { [key: string]: string } {
  return isLoggedIn()
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
}

export default function PageHeader() {
  const router = useRouter();
  const pathname = usePathname();

  console.log({ pathname });

  function handleLoggedIn(pageName: string) {
    router.push(`/${pageName}`);
  }

  return (
    <header>
      <button className="btn logo" onClick={() => handleLoggedIn("home")}>
        <Image src="/logo-csr.png" alt="logo" fill={true} />
      </button>
      <nav className="nav">
        {Object.entries(getKeysToButtonText()).map(([key, text]) => (
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
