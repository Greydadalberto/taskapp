'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authenticateUser } from '@/lib/cognito';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { idToken, groups } = await authenticateUser(email, password);

      // Store the token locally if needed
      localStorage.setItem('idToken', idToken);

      // Redirect based on user group
      if (groups.includes('Admins')) {
        router.push('/admin');
      } else if (groups.includes('Team')) {
        router.push('/team');
      } else {
        alert('User does not belong to any allowed group.');
      }
    } catch (err: any) {
      alert('Login failed: ' + err.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <h2>Login</h2>
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




// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Auth } from 'aws-amplify'; // ✅ Classic style import that matches your Amplify config
// import '@/lib/awsConfig'; // ✅ This runs Amplify.configure()

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const user = await Auth.signIn(email, password);
//       const groups = user.signInUserSession.accessToken.payload['cognito:groups'] || [];

//       console.log('User groups:', groups); // Debugging line - helpful!

//       if (groups.includes('Admins')) {
//         router.push('/admin');
//       } else if (groups.includes('Team')) {
//         router.push('/team');
//       } else {
//         alert('User not assigned to any group.');
//       }
//     } catch (err: any) {
//       console.error('Login failed:', err);
//       alert('Login failed: ' + err.message);
//     }
//   };

//   return (
//     <div className="max-w-sm mx-auto p-4">
//       <h2 className="text-xl font-bold mb-4">Login</h2>
//       <form onSubmit={handleLogin} className="flex flex-col gap-3">
//         <input
//           className="border p-2 rounded"
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           className="border p-2 rounded"
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button className="bg-blue-500 text-white rounded p-2" type="submit">
//           Sign In
//         </button>
//       </form>
//     </div>
//   );
// }





// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { signIn, getCurrentUser } from 'aws-amplify/auth';

// export default function Login() {
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const router = useRouter();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await signIn({ username: email, password });
//       const { username, signInDetails } = await getCurrentUser();
//       const groups = signInDetails?.tokenPayload['cognito:groups'] || [];
//       if (groups.includes('Admins')) router.push('/admin');
//       else router.push('/team');
//     } catch (err: any) {
//       alert('Login failed: ' + err.message);
//     }
//   };

//   return (
//     <div className="max-w-sm mx-auto p-4">
//       <h2 className="text-xl font-bold mb-4">Login</h2>
//       <form onSubmit={handleLogin} className="flex flex-col gap-3">
//         <input
//           className="border p-2 rounded"
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           className="border p-2 rounded"
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button className="bg-blue-500 text-white rounded p-2" type="submit">Sign In</button>
//       </form>
//     </div>
//   );
// }




// // pages/login.tsx
// 'use client';
// import { useState } from 'react';
// // import { Auth } from 'aws-amplify';
// import { useRouter } from 'next/navigation';

// export default function Login() {
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const router = useRouter();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await Auth.signIn(email, password);
//       const user = await Auth.currentAuthenticatedUser();
//       const groups = user.signInUserSession.accessToken.payload['cognito:groups'] || [];
//       if (groups.includes('Admins')) router.push('/admin');
//       else router.push('/teammember');
//     } catch (err: any) {
//       alert('Login failed: ' + err.message);
//     }
//   };

//   return (
//     <div className="max-w-sm mx-auto p-4">
//       <h2 className="text-xl font-bold mb-4">Login</h2>
//       <form onSubmit={handleLogin} className="flex flex-col gap-3">
//         <input
//           className="border p-2 rounded"
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           className="border p-2 rounded"
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button className="bg-blue-500 text-white rounded p-2" type="submit">Sign In</button>
//       </form>
//     </div>
//   );
// }