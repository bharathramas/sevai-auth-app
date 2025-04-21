export const dynamic = "force-dynamic"; // 💡 Required to enable getServerSession()

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

export default async function PrivatePage() {
  try {
    console.log("⏳ Attempting to fetch session on /private");

    const session = await getServerSession(authOptions);
    console.log("🔍 Fetched session:", session);

    if (!session || !session.user) {
      console.log("🚫 No session or user, redirecting...");
      redirect("/");
    }

    const { email = "", role = "", tenant_id = "" } = session.user;

    return (
      <div className="text-white p-8">
        <h1>🔐 Private Page</h1>
        <p>Email: {email}</p>
        <p>Role: {role}</p>
        <p>Tenant: {tenant_id}</p>
      </div>
    );
  } catch (err) {
    console.error("🔥 Error rendering /private:", err);
    return (
      <div className="text-white p-8">
        <h1>❌ Something went wrong</h1>
        <p>Check session config or token decoding.</p>
      </div>
    );
  }
}
