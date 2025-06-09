// pages/login.tsx
'use client';
import { useState } from 'react';
// import { Auth } from 'aws-amplify';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await Auth.signIn(email, password);
      const user = await Auth.currentAuthenticatedUser();
      const groups = user.signInUserSession.accessToken.payload['cognito:groups'] || [];
      if (groups.includes('Admins')) router.push('/admin');
      else router.push('/teammember');
    } catch (err: any) {
      alert('Login failed: ' + err.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input
          className="border p-2 rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 text-white rounded p-2" type="submit">Sign In</button>
      </form>
    </div>
  );
}