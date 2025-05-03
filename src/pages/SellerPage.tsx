import React from 'react'
import { LiveKitRoom } from '@livekit/components-react'

interface SellerPageProps {
  token: string
  room: string
}

export default function SellerPage({ token, room }: SellerPageProps) {
  if (!token) return <p>❌ Thiếu token</p>

  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      connect
      video
      audio
    >
      <h2>📡 Livestream đang phát từ người bán: {room}</h2>
    </LiveKitRoom>
  )
}
