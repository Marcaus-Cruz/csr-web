"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ExistingAccountButton from "../components/ExistingAccountButton";
import "../home/homePage.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      router.push("/reviews"); // Change path as needed
    } catch (err: any) {
      setErrorMsg("Login failed: " + (err?.message || ""));
    }
  };

  return (
    <div className="page not-logged-in">
      <form className="user-container login" onSubmit={handleLogin}>
        <h2 className="prompt">Login</h2>
        <div className="options">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
          <button className="btn login" type="submit">
            Log In
          </button>

          {errorMsg && (
            <ExistingAccountButton mightHaveExistingAccount={false} />
          )}
        </div>
      </form>
    </div>
  );
}
