import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Header from "@/components/Header";
import { Rocket, ShieldCheck, Settings2 } from "lucide-react";
import { motion } from "framer-motion";

export default async function PrivatePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-black text-white flex items-center justify-center">
          <p className="text-red-500 text-xl">🔒 Access denied. Please log in.</p>
        </main>
      </>
    );
  }

  const { email, role, tenant_id } = session.user;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-gray-950 text-white px-6 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text mb-2">
            Welcome back, {email}
          </h1>
          <p className="text-zinc-400 text-lg">
            Role: <span className="text-blue-400">{role}</span>
            {tenant_id && <> • Tenant: <span className="text-blue-400">{tenant_id}</span></>}
          </p>
        </section>

        {/* Feature Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-zinc-900 border border-zinc-700 p-6 rounded-2xl shadow hover:shadow-blue-500/20 transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <Rocket className="text-blue-400" />
              <h3 className="text-xl font-semibold">Explore Config</h3>
            </div>
            <p className="text-zinc-400 text-sm">
              Jump into your organization's configuration. Manage dropdowns, roles, and integrations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-zinc-900 border border-zinc-700 p-6 rounded-2xl shadow hover:shadow-blue-500/20 transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <Settings2 className="text-blue-400" />
              <h3 className="text-xl font-semibold">Smart Search</h3>
            </div>
            <p className="text-zinc-400 text-sm">
              Run hybrid searches across your data using semantic embeddings and filters.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-zinc-900 border border-zinc-700 p-6 rounded-2xl shadow hover:shadow-blue-500/20 transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="text-blue-400" />
              <h3 className="text-xl font-semibold">Access Dashboard</h3>
            </div>
            <p className="text-zinc-400 text-sm">
              View document ingestion stats, tenant activity, and more.
            </p>
          </motion.div>
        </section>
      </main>
    </>
  );
}
