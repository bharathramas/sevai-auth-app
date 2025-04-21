import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions"; // ✅ Same shared source
import { redirect } from "next/navigation";

export default async function PrivatePage() {
  console.log("⏳ Attempting to fetch session on /private");

  const session = await getServerSession(authOptions);
  console.log("🔍 Fetched session:", session);

  if (!session) {
    console.log("🚫 No session found, redirecting...");
    redirect("/");
  }

  return (
    <div className="text-white p-8">
      <h1>🔐 Private Page</h1>
      <p>Email: {session.user.email}</p>
      <p>Role: {session.user.role}</p>
      <p>Tenant: {session.user.tenant_id}</p>
    </div>
  );
}
