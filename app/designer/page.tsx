'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FlowItem {
  flowId: string;
  flowName: string;
  description: string;
  createdAt: string;
}

export default function DesignerHomePage() {
  const [flows, setFlows] = useState<FlowItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchFlows() {
      try {
        const res = await fetch('/api/designer/flows');
        const data = await res.json();
        setFlows(data.flows || []);
      } catch (error) {
        console.error('Failed to fetch flows', error);
      }
    }
    fetchFlows();
  }, []);

  const filteredFlows = flows.filter(flow =>
    flow.flowName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My SevAI Flows</h1>
        <Button
          onClick={() => router.push('/designer/flow/new')}
          className="bg-blue-600 hover:bg-blue-700"
        >
          + New Flow
        </Button>
      </div>

      <Input
        placeholder="Search Flows..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 w-full bg-zinc-800 text-white border border-zinc-600"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFlows.map((flow) => (
          <div
            key={flow.flowId}
            className="p-4 bg-zinc-900 border border-zinc-700 rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition cursor-pointer"
            onClick={() => router.push(`/designer/flow/${flow.flowId}`)}
          >
            <h2 className="text-lg font-semibold">{flow.flowName}</h2>
            <p className="text-sm text-zinc-400">{flow.description || 'No description provided.'}</p>
            <p className="text-xs text-zinc-500 mt-2">{new Date(flow.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>

      {filteredFlows.length === 0 && (
        <p className="text-center text-zinc-500 mt-10">No flows found. Create your first flow!</p>
      )}
    </main>
  );
}
