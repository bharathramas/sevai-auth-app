'use client';

import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import Canvas from '@/app/designer/components/Canvas/Canvas';
import Sidebar from '@/app/designer/components/Sidebar/Sidebar';

export default function DesignerPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] bg-black">
      <ReactFlowProvider>
        {/* Sidebar */}
        <div className="w-72 bg-zinc-900 p-4 border-r border-zinc-800">
          <Sidebar />
        </div>

        {/* Canvas */}
        <div className="flex-1 relative">
          <Canvas />
        </div>
      </ReactFlowProvider>
    </div>
  );
}
