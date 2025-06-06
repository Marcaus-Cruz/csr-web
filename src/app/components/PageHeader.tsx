"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "../lib/withAuth";
import "./pageHeader.css";

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
        <button className="btn standard" onClick={() => handleLoggedIn("home")}>
          Home
        </button>
        <button
          className="btn standard"
          onClick={() => handleLoggedIn("reviews")}
        >
          Reviews
        </button>
        <button
          className="btn standard"
          onClick={() => handleLoggedIn("create")}
        >
          Create
        </button>
        {!isLoggedIn() && (
          <button
            className="btn standard"
            onClick={() => handleLoggedIn("login")}
          >
            Login
          </button>
        )}
        {isLoggedIn() && (
          <button
            className="btn standard"
            onClick={() => handleLoggedIn("logout")}
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
