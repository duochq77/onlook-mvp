import React from 'react'
import {
  LiveKitRoom,
  ParticipantTile,
  GridLayout,
} from '@livekit/components-react'

interface ViewerPageProps {
  token: string
  room: string
}

export default function ViewerPage({ token, room }: ViewerPageProps) {
  if (!token) return <p>❌ Thiếu token</p>

  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      connect
      video
      audio
    >
      <h2>👀 Người xem đang theo dõi phòng: {room}</h2>
      <GridLayout tracks={[{ source: 'camera', withPlaceholder: true }]}>
        <ParticipantTile />
      </GridLayout>
    </LiveKitRoom>
  )
}
