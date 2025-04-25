'use client'

import { useEffect } from 'react'

// The original Flowise app starts from index.jsx — import the internal mount logic
// You will likely need to migrate files like store, theme, layouts from /packages/ui/src

export default function DesignerApp({ session }: { session: any }) {
  useEffect(() => {
    console.log('Session from Cognito:', session)
    // If needed, mount any dynamic logic here
  }, [session])

  return (
    <div className="min-h-screen bg-[#0f172a] text-[#e2e8f0] p-4">
      <h1 className="text-3xl font-bold mb-4">SevAI Designer</h1>
      <p className="text-sm opacity-80 mb-6">Multilingual flow builder (Flowise-powered UI)</p>
      {/* TODO: Mount actual Flowise components here */}
      <div className="border border-[#38bdf8] p-6 rounded-xl bg-[#1e293b]">
        Flow canvas will appear here...
      </div>
    </div>
  )
}
