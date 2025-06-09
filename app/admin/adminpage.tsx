
'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Auth } from 'aws-amplify';

interface Task {
  taskId: string;
  title: string;
  description: string;
  assignedTo: string;
  deadline: string;
}

export default function Admin() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [deadline, setDeadline] = useState('');

  const fetchTasks = async () => {
    const session = await Auth.currentSession();
    const token = session.getIdToken().getJwtToken();
    const res = await axios.get('/api/tasks', { headers: { Authorization: token } });
    setTasks(res.data);
  };

  const createTask = async () => {
    const session = await Auth.currentSession();
    const token = session.getIdToken().getJwtToken();
    await axios.post('/api/tasks', { title, description, assignedTo, deadline }, {
      headers: { Authorization: token }
    });
    fetchTasks();
  };

  useEffect(() => { fetchTasks(); }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-2">Create Task</h3>
          <input className="border p-2 w-full mb-2" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
          <input className="border p-2 w-full mb-2" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
          <input className="border p-2 w-full mb-2" placeholder="Assigned To (email)" onChange={(e) => setAssignedTo(e.target.value)} />
          <input className="border p-2 w-full mb-2" type="date" onChange={(e) => setDeadline(e.target.value)} />
          <button className="bg-green-600 text-white px-4 py-2" onClick={createTask}>Create</button>
        </div>
        <div>
          <h3 className="font-semibold mb-2">All Tasks</h3>
          <ul className="space-y-2">
            {tasks.map((t) => (
              <li key={t.taskId} className="border p-2 rounded">
                <strong>{t.title}</strong><br />{t.description}<br />Assigned to: {t.assignedTo}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}