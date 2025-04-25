'use client';

import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
  addEdge,
  Connection,
  Edge,
  Node,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Button } from '@/components/ui/button';
import PromptNode from '../Nodes/PromptNode';
import ChainNode from '../Nodes/ChainNode';
import ToolNode from '../Nodes/ToolNode';
import { BackgroundVariant } from 'reactflow';

const nodeTypes = {
  prompt: PromptNode,
  chain: ChainNode,
  tool: ToolNode,
};

export default function Canvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  const handleNodeDataChange = (id: string, newData: any) => {
    setNodes((nodes) =>
      nodes.map((node) => (node.id === id ? { ...node, data: newData } : node))
    );
  };

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const type = event.dataTransfer.getData('application/reactflow');
    const reactFlowBounds = (event.target as HTMLElement).getBoundingClientRect();
    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };
    const id = crypto.randomUUID();

    let initialData: any = { onChange: handleNodeDataChange };
    if (type === 'prompt') initialData.prompt = '';
    if (type === 'chain') initialData.chainName = '';
    if (type === 'tool') initialData.toolType = '';

    const newNode = {
      id,
      type,
      position,
      data: initialData,
    };

    setNodes((nds) => nds.concat(newNode));
  }, []);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handleSaveFlow = () => {
    const flow = { nodes, edges };
    const flowJSON = JSON.stringify(flow, null, 2);
    console.log('Saved Flow JSON:', flowJSON);

    const blob = new Blob([flowJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sevai_flow.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ReactFlowProvider>
      <div className="w-full h-full bg-zinc-950 relative">
        <Button
          onClick={handleSaveFlow}
          className="absolute top-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg"
        >
          Save Flow
        </Button>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
          nodeTypes={nodeTypes}
        >
          <Background variant={BackgroundVariant.Dots} gap={24} size={1.5} color="#333" />
          <Controls showInteractive={false} position="bottom-right" />
          <MiniMap
            nodeColor={() => '#4F46E5'}
            nodeStrokeWidth={3}
            maskColor="rgba(0, 0, 0, 0.2)"
          />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}
