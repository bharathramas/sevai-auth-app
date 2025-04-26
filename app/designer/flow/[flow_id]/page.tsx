'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Canvas from '@/app/designer/components/Canvas/Canvas';
import Sidebar from '@/app/designer/components/Sidebar/Sidebar';
import NodeSettings from '@/app/designer/components/Settings/NodeSettings';
import { Node, Edge } from 'reactflow';
import { getSession } from 'next-auth/react'; // if session needed
import { useRouter } from 'next/navigation'; // if you use router

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
      <div className="flex w-full h-full">
       <Sidebar />
       <div className="flex-1 relative">
        <Canvas initialNodes={initialNodes} initialEdges={initialEdges} />
        <NodeSettings selectedNode={selectedNode} onUpdateNode={handleNodeUpdate} />
       </div>
     </div>
    );
  }

  return (
    <main className="h-screen bg-black">
      <Canvas initialNodes={nodes} initialEdges={edges} />
    </main>
  );
}
