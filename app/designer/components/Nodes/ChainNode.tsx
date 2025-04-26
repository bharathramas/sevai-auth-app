'use client';

import { Handle, Position, NodeProps } from 'reactflow';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function ChainNode({ data, selected, id }: NodeProps) {
  return (
    <motion.div
      className={`w-80 rounded-xl border p-4 shadow-md transition 
        ${selected ? 'border-blue-500 shadow-blue-500/20' : 'border-zinc-700'} 
        bg-zinc-900 relative`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {/* Input Handle (Incoming Connections) */}
      <Handle
        type="target"
        position={Position.Top}
        id="input"
        style={{ background: '#10B981', width: 12, height: 12, borderRadius: '50%' }}
      />

      {/* Title */}
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-5 h-5 text-blue-400" />
        <h3 className="text-white font-semibold text-sm tracking-wide">Chain Node</h3>
      </div>

      {/* Chain Name Input */}
      <div className="mb-4">
        <label className="text-xs text-zinc-400 mb-1 block">Chain Name</label>
        <Input
          value={data.chainName}
          onChange={(e) => data.onChange(id, { ...data, chainName: e.target.value })}
          placeholder="Enter chain name..."
          className="bg-zinc-800 text-white border-zinc-600 focus:border-blue-500"
        />
      </div>

      {/* Output Handle (Outgoing Connections) */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="output"
        style={{ background: '#3B82F6', width: 12, height: 12, borderRadius: '50%' }}
      />
    </motion.div>
  );
}
