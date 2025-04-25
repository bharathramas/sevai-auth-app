'use client'

import { useSession } from 'next-auth/react'
import DesignerApp from '@/components/DesignerApp'

export default function Page() {
  const { data: session } = useSession()

  if (!session) return <p className="text-white p-4">Loading...</p>

  return <DesignerApp session={session} />
}
