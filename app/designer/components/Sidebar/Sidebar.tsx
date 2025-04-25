'use client';

import { useCallback } from 'react';
import { useReactFlow } from 'reactflow';
import { Plus, Zap, Settings2 } from 'lucide-react';

export default function Sidebar() {
  const reactFlowInstance = useReactFlow();

  const onDragStart = useCallback((event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  }, []);

  return (
    <div className="flex flex-col gap-6 p-4 bg-zinc-900 h-full rounded-xl border border-zinc-700 shadow-inner">
      <h2 className="text-white text-lg font-semibold">Node Palette</h2>

      <div className="flex flex-col gap-4">
        <SidebarNode
          label="Prompt Node"
          type="prompt"
          icon={<Plus className="w-5 h-5 text-blue-400" />}
          onDragStart={onDragStart}
        />
        <SidebarNode
          label="Chain Node"
          type="chain"
          icon={<Zap className="w-5 h-5 text-blue-400" />}
          onDragStart={onDragStart}
        />
        <SidebarNode
          label="Tool Node"
          type="tool"
          icon={<Settings2 className="w-5 h-5 text-blue-400" />}
          onDragStart={onDragStart}
        />
      </div>
    </div>
  );
}

function SidebarNode({
  label,
  type,
  icon,
  onDragStart,
}: {
  label: string;
  type: string;
  icon: React.ReactNode;
  onDragStart: (e: React.DragEvent, type: string) => void;
}) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, type)}
      className="flex items-center gap-3 p-3 bg-zinc-800 border border-zinc-600 rounded-xl cursor-grab active:cursor-grabbing shadow-md hover:shadow-blue-500/20 transition hover:scale-105 transform"
    >
      {icon}
      <span className="text-sm text-white">{label}</span>
    </div>
  );
}
