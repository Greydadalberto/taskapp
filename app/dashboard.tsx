'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Auth } from 'aws-amplify';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const redirectToRolePage = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const groups = user.signInUserSession.accessToken.payload['cognito:groups'] || [];
        if (groups.includes('Admins')) router.push('/admin');
        else router.push('/team');
      } catch (err) {
        router.push('/login'); // if not logged in, redirect to login
      }
    };
    redirectToRolePage();
  }, []);

  return <p>Loading...</p>;
}




// // pages/dashboard.tsx
// 'use client';
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Auth } from 'aws-amplify';

// export default function Dashboard() {
//   const router = useRouter();

//   useEffect(() => {
//     const redirectToRolePage = async () => {
//       const user = await Auth.currentAuthenticatedUser();
//       const groups = user.signInUserSession.accessToken.payload['cognito:groups'] || [];
//       if (groups.includes('Admins')) router.push('/admin');
//       else router.push('/team');
//     };
//     redirectToRolePage();
//   }, []);

//   return <p>Loading...</p>;
// }