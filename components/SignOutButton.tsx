'use client';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/navigation';

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await Auth.signOut();
    router.push('/login');
  };

  return (
    <button onClick={handleSignOut} className="bg-red-600 text-white px-4 py-2 rounded">
      Sign Out
    </button>
  );
}



// 'use client';
// import { Auth } from 'aws-amplify';
// import { useRouter } from 'next/navigation';

// export default function SignOutButton() {
//   const router = useRouter();

//   const signOut = async () => {
//     await Auth.signOut();
//     router.push('/login');
//   };

//   return (
//     <button onClick={signOut} className="bg-red-600 text-white px-4 py-2 rounded">
//       Sign Out
//     </button>
//   );
// }
