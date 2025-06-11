'use client';
import { useState } from 'react';
import { authAxios } from '@/lib/api';

export default function TaskForm({ onTaskCreated }: { onTaskCreated: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [deadline, setDeadline] = useState('');

  const createTask = async () => {
    const axios = await authAxios();
    await axios.post('/api/tasks', { title, description, assignedTo, deadline });
    onTaskCreated();
  };

  return (
    <div>
      <input className="input" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <input className="input" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
      <input className="input" placeholder="Assigned To" onChange={(e) => setAssignedTo(e.target.value)} />
      <input className="input" type="date" onChange={(e) => setDeadline(e.target.value)} />
      <button className="btn" onClick={createTask}>Create Task</button>
    </div>
  );
}


// 'use client';
// import { useState } from 'react';
// import { authAxios } from '@/lib/api';

// export default function TaskForm({ onTaskCreated }: { onTaskCreated: () => void }) {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [assignedTo, setAssignedTo] = useState('');
//   const [deadline, setDeadline] = useState('');

//   const createTask = async () => {
//     const axios = await authAxios();
//     await axios.post('/api/tasks', { title, description, assignedTo, deadline });
//     onTaskCreated();
//   };

//   return (
//     <div>
//       <input className="input" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
//       <input className="input" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
//       <input className="input" placeholder="Assigned To" onChange={(e) => setAssignedTo(e.target.value)} />
//       <input className="input" type="date" onChange={(e) => setDeadline(e.target.value)} />
//       <button className="btn" onClick={createTask}>Create Task</button>
//     </div>
//   );
// }
