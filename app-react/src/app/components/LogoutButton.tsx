'use client';

import { useRouter } from 'next/navigation';
import { pb } from '@/lib/pocketbase';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    pb.authStore.clear();

    // Call the logout API route to clear the cookie
    await fetch('/api/auth/logout', {
      method: 'POST',
    });

    router.push('/auth/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Logout
    </button>
  );
}
