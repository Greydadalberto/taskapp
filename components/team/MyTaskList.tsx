'use client';
import { useEffect, useState } from 'react';
import { authAxios } from '@/lib/api';
import { Auth } from 'aws-amplify';
import { Task } from '@/types';

export default function MyTaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState('');

  const fetchTasks = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const email = user.attributes.email;
    const axios = await authAxios();
    const res = await axios.get(`/api/tasks?assignedTo=${email}`);
    setTasks(res.data);
  };

  const updateStatus = async (taskId: string, status: string) => {
    const axios = await authAxios();
    await axios.put(`/api/tasks/${taskId}`, { status });
    fetchTasks();
  };

  useEffect(() => { fetchTasks(); }, []);

  const filtered = tasks.filter((t) => t.title.includes(filter));

  return (
    <div>
      <input className="input" placeholder="Filter tasks" onChange={(e) => setFilter(e.target.value)} />
      <ul className="space-y-2 mt-2">
        {filtered.map((task) => (
          <li key={task.taskId} className="border p-2 rounded">
            <strong>{task.title}</strong><br />
            {task.description}<br />
            Deadline: {task.deadline}<br />
            <select
              className="mt-2 p-1 border rounded"
              value={task.status}
              onChange={(e) => updateStatus(task.taskId, e.target.value)}
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}
