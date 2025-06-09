// pages/teammember.tsx
'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Auth } from 'aws-amplify';

interface Task {
  taskId: string;
  title: string;
  description: string;
  deadline: string;
  status: string;
}

export default function TeamMember() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchMyTasks = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const email = user.attributes.email;
    const session = await Auth.currentSession();
    const token = session.getIdToken().getJwtToken();
    const res = await axios.get(`/api/tasks?assignedTo=${email}`, { headers: { Authorization: token } });
    setTasks(res.data);
  };

  const updateStatus = async (taskId: string, newStatus: string) => {
    const session = await Auth.currentSession();
    const token = session.getIdToken().getJwtToken();
    await axios.put(`/api/tasks/${taskId}`, { status: newStatus }, {
      headers: { Authorization: token }
    });
    fetchMyTasks();
  };

  useEffect(() => { fetchMyTasks(); }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Tasks</h2>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.taskId} className="border p-2 rounded">
            <strong>{task.title}</strong><br />
            {task.description}<br />
            Deadline: {task.deadline}<br />
            Status: {task.status}<br />
            <select value={task.status} onChange={(e) => updateStatus(task.taskId, e.target.value)} className="mt-2 p-1 border rounded">
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