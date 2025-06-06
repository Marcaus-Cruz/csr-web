import { useState } from 'react';
import { useRouter } from 'next/router';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Authenticate the user
      const authData = await pb.collection('users').authWithPassword(email, password);
      
      console.log('Logged in:', authData);

      // After successful login, redirect the user to a protected page
      router.push('/dashboard'); // Replace with the path to your dashboard or home page

    } catch (err: any) {
      // If login fails, show an error message
      setErrorMsg('Login failed: ' + (err?.message || 'Please check your credentials.'));
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      <form onSubmit={handleLogin}>
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
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}