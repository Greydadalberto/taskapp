'use client';
import { useEffect, useState } from 'react';
import { authAxios } from '@/lib/api';
import { Task } from '@/types';

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState('');

  const fetchTasks = async () => {
    const axios = await authAxios();
    const res = await axios.get('/api/tasks');
    setTasks(res.data);
  };

  useEffect(() => { fetchTasks(); }, []);

  const filtered = tasks.filter((t) => t.title.includes(filter));

  return (
    <div>
      <input className="input" placeholder="Search by title" onChange={(e) => setFilter(e.target.value)} />
      <ul className="space-y-2 mt-2">
        {filtered.map((t) => (
          <li key={t.taskId} className="border p-2 rounded">
            <strong>{t.title}</strong><br />
            {t.description}<br />
            Assigned to: {t.assignedTo}
          </li>
        ))}
      </ul>
    </div>
  );
}
