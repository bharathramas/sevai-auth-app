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
        bg-zinc-900`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {/* Title */}
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-5 h-5 text-blue-400" />
        <h3 className="text-white font-semibold text-sm tracking-wide">Chain Node</h3>
      </div>

      {/* Chain Input */}
      <div className="mb-4">
        <label className="text-xs text-zinc-400 mb-1 block">Chain Name</label>
        <Input
          value={data.chainName}
          onChange={(e) => data.onChange(id, { ...data, chainName: e.target.value })}
          placeholder="Enter chain name..."
          className="bg-zinc-800 text-white border-zinc-600 focus:border-blue-500"
        />
      </div>

      {/* Input handle */}
      <Handle type="target" position={Position.Top} id="input" style={{ background: '#3B82F6' }} />
      {/* Output handle */}
      <Handle type="source" position={Position.Bottom} id="output" style={{ background: '#3B82F6' }} />
    </motion.div>
  );
}
