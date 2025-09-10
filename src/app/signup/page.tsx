"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMsg("Passwords don't match.");
      return;
    }

    try {
      // TODO: Add user to Dynamodb

      router.push("/reviews");
    } catch (error: any) {
      setErrorMsg(error?.message || "Signup failed");
    }
  };

  return (
    <div className="page sign-up">
      <form className="user-container sign-up" onSubmit={handleSignup}>
        <h2 className="prompt">Create Account</h2>
        <div className="options">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
          <button className="btn btn-sign-up" type="submit">
            Sign Up
          </button>
          {errorMsg}
        </div>
      </form>
    </div>
  );
}
