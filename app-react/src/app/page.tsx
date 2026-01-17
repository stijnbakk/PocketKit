import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "./components/LogoutButton";

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">PocketKit React</h1>
            </div>
            <div className="flex items-center">
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome, {user.email}!
            </h2>
            <p className="text-gray-600 mb-4">
              You are successfully authenticated with PocketBase.
            </p>
            <div className="bg-gray-50 rounded-md p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">User Information</h3>
              <dl className="space-y-1 text-sm">
                <div className="flex">
                  <dt className="text-gray-500 w-24">ID:</dt>
                  <dd className="text-gray-900">{user.id}</dd>
                </div>
                <div className="flex">
                  <dt className="text-gray-500 w-24">Email:</dt>
                  <dd className="text-gray-900">{user.email}</dd>
                </div>
                {user.username && (
                  <div className="flex">
                    <dt className="text-gray-500 w-24">Username:</dt>
                    <dd className="text-gray-900">{user.username}</dd>
                  </div>
                )}
                <div className="flex">
                  <dt className="text-gray-500 w-24">Verified:</dt>
                  <dd className="text-gray-900">{user.verified ? 'Yes' : 'No'}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
