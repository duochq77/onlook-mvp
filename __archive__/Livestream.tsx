import React from 'react'
import { LiveKitRoom } from '@livekit/components-react'
import '@livekit/components-styles'

interface Props {
  token: string
  room: string
}

export default function Livestream({ token, room }: Props) {
  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      connect={true}
      onConnected={() => {
        console.log('✅ Đã kết nối vào phòng')
      }}
    >
      <h1>🎥 Livestream đang diễn ra tại phòng: {room}</h1>
    </LiveKitRoom>
  )
}
