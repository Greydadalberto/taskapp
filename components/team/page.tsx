'use client';
import MyTaskList from '@/components/team/MyTaskList';
import SignOutButton from '@/components/SignOutButton';

export default function TeamPage() {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">My Tasks</h2>
        <SignOutButton />
      </div>
      <MyTaskList />
    </div>
  );
}
