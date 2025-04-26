'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Canvas from '@/app/designer/components/Canvas/Canvas';

export default function DesignerFlowPage() {
  const { flow_id } = useParams() as { flow_id: string };
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFlow() {
      if (flow_id === 'new') {
        // Start with empty flow
        setNodes([]);
        setEdges([]);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/designer/flows/${flow_id}`);
        const data = await res.json();

        if (data.flowJson) {
          setNodes(data.flowJson.nodes || []);
          setEdges(data.flowJson.edges || []);
        } else {
          setNodes([]);
          setEdges([]);
        }
      } catch (error) {
        console.error('Failed to fetch flow', error);
        setNodes([]);
        setEdges([]);
      } finally {
        setLoading(false);
      }
    }
    fetchFlow();
  }, [flow_id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading Flow...
      </div>
    );
  }

  return (
    <main className="h-screen bg-black">
      <Canvas initialNodes={nodes} initialEdges={edges} />
    </main>
  );
}
