"use client";

import { useRouter } from "next/navigation";

export default function ExistingAccountButton({
  mightHaveExistingAccount,
}: {
  mightHaveExistingAccount: boolean;
}) {
  const router = useRouter();

  const promptText = mightHaveExistingAccount
    ? "Already have an account?"
    : "Can't find your account? Create one!";
  const buttonText = mightHaveExistingAccount ? "Login" : "Create an Account";
  const buttonClass = mightHaveExistingAccount
    ? "btn btn-login"
    : "btn btn-signup";
  const route = mightHaveExistingAccount ? "/login" : "/signup";

  return (
    <div className="existing-account">
      <div className="options-text text">{promptText}</div>
      <button className={buttonClass} onClick={() => router.push(route)}>
        {buttonText}
      </button>
    </div>
  );
}
