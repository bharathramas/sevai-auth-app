'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Node } from 'reactflow';

interface NodeSettingsProps {
  selectedNode: Node | null;
  onUpdateNode: (id: string, data: any) => void;
}

export default function NodeSettings({ selectedNode, onUpdateNode }: NodeSettingsProps) {
  const [localData, setLocalData] = useState<any>({});

  useEffect(() => {
    if (selectedNode) {
      setLocalData(selectedNode.data || {});
    }
  }, [selectedNode]);

  if (!selectedNode) {
    return (
      <div className="p-4 text-white bg-zinc-900 rounded-xl border border-zinc-700 shadow-inner">
        <p className="text-zinc-400">Select a node to edit settings.</p>
      </div>
    );
  }

  const handleChange = (field: string, value: string) => {
    const updatedData = { ...localData, [field]: value };
    setLocalData(updatedData);
    onUpdateNode(selectedNode.id, updatedData);
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-zinc-900 h-full rounded-xl border border-zinc-700 shadow-inner">
      <h2 className="text-white text-lg font-semibold">Edit Node</h2>

      {selectedNode.type === 'prompt' && (
        <>
          <Label className="text-white">Prompt</Label>
          <Input
            value={localData.prompt || ''}
            onChange={(e) => handleChange('prompt', e.target.value)}
            placeholder="Enter prompt text"
          />
        </>
      )}

      {selectedNode.type === 'chain' && (
        <>
          <Label className="text-white">Chain Name</Label>
          <Input
            value={localData.chainName || ''}
            onChange={(e) => handleChange('chainName', e.target.value)}
            placeholder="Enter chain name"
          />
        </>
      )}

      {selectedNode.type === 'tool' && (
        <>
          <Label className="text-white">Tool Type</Label>
          <Input
            value={localData.toolType || ''}
            onChange={(e) => handleChange('toolType', e.target.value)}
            placeholder="Enter tool type"
          />
        </>
      )}
    </div>
  );
}
