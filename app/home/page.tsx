
import { getServerSession } from "next-auth";

export default async function HomePage() {
  const session = await getServerSession();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome, {session?.user?.email}</h1>
        <a href="/api/auth/signout" className="underline text-blue-400">Sign out</a>
      </div>
    </div>
  );
}
