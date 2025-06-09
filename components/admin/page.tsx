'use client';
import TaskForm from '@/components/admin/TaskForm';
import TaskList from '@/components/admin/TaskList';
import SignOutButton from '@/components/SignOutButton';

export default function AdminPage() {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <SignOutButton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TaskForm onTaskCreated={() => location.reload()} />
        <TaskList />
      </div>
    </div>
  );
}
