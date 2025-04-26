'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Canvas from '@/app/designer/components/Canvas/Canvas';
import Sidebar from '@/app/designer/components/Sidebar/Sidebar';
import NodeSettings from '@/app/designer/components/Settings/NodeSettings';
import { Node, Edge } from 'reactflow';

export default function DesignerFlowPage() {
  const { flow_id } = useParams() as { flow_id: string };
  
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFlow() {
      if (flow_id === 'new') {
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

  const handleNodeUpdate = (id: string, updatedData: any) => {
    setNodes((nds) => nds.map((node) => (node.id === id ? { ...node, data: updatedData } : node)));
  };

  if (loading) {
    return (
      <div className="flex w-full h-full">
        <Sidebar />
        <div className="flex-1 relative">
          {/* Show empty canvas while loading */}
          <Canvas initialNodes={[]} initialEdges={[]} />
          <NodeSettings selectedNode={null} onUpdateNode={() => {}} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full h-full">
      <Sidebar />
      <div className="flex-1 relative">
        <Canvas initialNodes={nodes} initialEdges={edges} />
        <NodeSettings selectedNode={selectedNode} onUpdateNode={handleNodeUpdate} />
      </div>
    </div>
  );
}
