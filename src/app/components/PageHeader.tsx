"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "../lib/withAuth";
import "./pageHeader.css";

// TODO: useEffect to update on login change
function getKeysToText(): { [key: string]: string } {
  return isLoggedIn()
    ? {
        home: "Home",
        reviews: "Reviews",
        create: "Create",
        hitlist: "Hitlist",
        logout: "Logout",
      }
    : {
        home: "Home",
        login: "Login/Signup",
      };
}

export default function PageHeader({ setCurrentPage }) {
  const router = useRouter();

  function handleLoggedIn(pageName: pageKey) {
    if (isLoggedIn()) {
      setCurrentPage(pageName);
      router.push(`/${pageName}`);
    } else {
      setCurrentPage("home");
      router.push("/home");
    }
  }

  return (
    <header>
      <button className="btn logo" onClick={() => handleLoggedIn("home")}>
        <Image src="/logo-csr.png" alt="logo" fill={true} />
      </button>
      <nav className="nav">
        {Object.entries(getKeysToText()).map(([key, text]) => (
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
