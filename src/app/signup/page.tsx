'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMsg("Passwords don't match.");
      return;
    }

    try {
      const newUser = await pb.collection('users').create({
        email,
        password,
        passwordConfirm: confirmPassword,
      });

      await pb.collection('users').authWithPassword(email, password);

      router.push('/reviews');

    } catch (error: any) {
      setErrorMsg(error?.message || 'Signup failed');
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Create Account</h2>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      /><br />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      /><br />
      <button type="submit">Sign Up</button>
    </form>
  );
}