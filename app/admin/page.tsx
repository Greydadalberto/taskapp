'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Auth } from 'aws-amplify'; // ✅ Updated import
import '@/lib/awsConfig';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const groups = user.signInUserSession.accessToken.payload['cognito:groups'] || [];
        if (!groups.includes('Admins')) {
          alert('Not authorized');
          router.push('/login');
        }
      } catch {
        router.push('/login');
      }
    };
    checkUser();
  }, []);

  return <h2>Welcome, Admin!</h2>;
}



// 'use client';
// import TaskForm from '@/components/admin/TaskForm';
// import TaskList from '@/components/admin/TaskList';
// import SignOutButton from '@/components/SignOutButton';

// export default function AdminPage() {
//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">Admin Dashboard</h2>
//         <SignOutButton />
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <TaskForm onTaskCreated={() => location.reload()} />
//         <TaskList />
//       </div>
//     </div>
//   );
// }



// 'use client';
// import TaskForm from '@/components/admin/TaskForm';
// import TaskList from '@/components/admin/TaskList';
// import SignOutButton from '@/components/SignOutButton';

// export default function AdminPage() {
//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">Admin Dashboard</h2>
//         <SignOutButton />
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <TaskForm onTaskCreated={() => location.reload()} />
//         <TaskList />
//       </div>
//     </div>
//   );
// }



// 'use client';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Auth } from 'aws-amplify';
// import { useRouter } from 'next/navigation';

// interface Task {
//   taskId: string;
//   title: string;
//   description: string;
//   assignedTo: string;
//   deadline: string;
//   status?: string;
// }

// export default function AdminDashboard() {
//   const router = useRouter();
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [assignedTo, setAssignedTo] = useState('');
//   const [deadline, setDeadline] = useState('');
//   const [filterStatus, setFilterStatus] = useState<string>('All');

//   const fetchTasks = async () => {
//     try {
//       const session = await Auth.currentSession();
//       const token = session.getIdToken().getJwtToken();
//       const res = await axios.get('/api/tasks', {
//         headers: { Authorization: token },
//       });
//       setTasks(res.data);
//     } catch (error) {
//       console.error('Failed to fetch tasks:', error);
//     }
//   };

//   const createTask = async () => {
//     try {
//       const session = await Auth.currentSession();
//       const token = session.getIdToken().getJwtToken();
//       await axios.post(
//         '/api/tasks',
//         { title, description, assignedTo, deadline },
//         { headers: { Authorization: token } }
//       );
//       fetchTasks();
//     } catch (error) {
//       console.error('Failed to create task:', error);
//     }
//   };

//   const signOut = async () => {
//     await Auth.signOut();
//     router.push('/login');
//   };

//   const filteredTasks = filterStatus === 'All'
//     ? tasks
//     : tasks.filter((t) => t.status === filterStatus);

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">Admin Dashboard</h2>
//         <button onClick={signOut} className="bg-red-500 text-white px-4 py-2 rounded">Sign Out</button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* Task Creation */}
//         <div>
//           <h3 className="font-semibold mb-2">Create Task</h3>
//           <input className="border p-2 w-full mb-2" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
//           <input className="border p-2 w-full mb-2" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
//           <input className="border p-2 w-full mb-2" placeholder="Assigned To (email)" onChange={(e) => setAssignedTo(e.target.value)} />
//           <input className="border p-2 w-full mb-2" type="date" onChange={(e) => setDeadline(e.target.value)} />
//           <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={createTask}>Create</button>
//         </div>

//         {/* Task List */}
//         <div>
//           <div className="flex justify-between items-center mb-2">
//             <h3 className="font-semibold">All Tasks</h3>
//             <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border p-1 rounded">
//               <option value="All">All</option>
//               <option value="Pending">Pending</option>
//               <option value="In Progress">In Progress</option>
//               <option value="Completed">Completed</option>
//             </select>
//           </div>

//           <ul className="space-y-2">
//             {filteredTasks.map((task) => (
//               <li key={task.taskId} className="border p-2 rounded">
//                 <strong>{task.title}</strong><br />
//                 {task.description}<br />
//                 Assigned to: {task.assignedTo}<br />
//                 Deadline: {task.deadline}<br />
//                 Status: {task.status || 'Pending'}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }
