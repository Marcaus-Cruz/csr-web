"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import pb, { clientIsLoggedIn } from "../lib/pocketbaseClient";
import "./pageHeader.css";

export default function PageHeader() {
  const router = useRouter();
  const pathname = usePathname();

  console.log({ pathname });
  // console.warn(pb.authStore);

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
            onClick={() => router.push(`/${key}`)}
          >
            {text}
          </button>
        ))}
      </nav>
    </header>
  );
}
