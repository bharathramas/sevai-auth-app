import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function PrivatePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/"); // 🔁 go back to homepage if not logged in
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
