'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/navigation';

interface Task {
  taskId: string;
  title: string;
  description: string;
  deadline: string;
  status: string;
}

export default function TeamMemberDashboard() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const fetchMyTasks = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const email = user.attributes.email;
      const session = await Auth.currentSession();
      const token = session.getIdToken().getJwtToken();
      const res = await axios.get(`/api/tasks?assignedTo=${email}`, {
        headers: { Authorization: token },
      });
      setTasks(res.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const updateStatus = async (taskId: string, newStatus: string) => {
    try {
      const session = await Auth.currentSession();
      const token = session.getIdToken().getJwtToken();
      await axios.put(`/api/tasks/${taskId}`, { status: newStatus }, {
        headers: { Authorization: token },
      });
      fetchMyTasks();
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  const signOut = async () => {
    await Auth.signOut();
    router.push('/login');
  };

  const filteredTasks = filterStatus === 'All'
    ? tasks
    : tasks.filter((task) => task.status === filterStatus);

  useEffect(() => {
    fetchMyTasks();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">My Tasks</h2>
        <button onClick={signOut} className="bg-red-500 text-white px-4 py-2 rounded">Sign Out</button>
      </div>

      <div className="mb-4">
        <label className="font-medium mr-2">Filter:</label>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border p-1 rounded">
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <ul className="space-y-4">
        {filteredTasks.map((task) => (
          <li key={task.taskId} className="border p-4 rounded shadow">
            <strong>{task.title}</strong><br />
            {task.description}<br />
            Deadline: {task.deadline}<br />
            Status:
            <select
              value={task.status}
              onChange={(e) => updateStatus(task.taskId, e.target.value)}
              className="mt-1 p-1 border rounded w-full"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}
