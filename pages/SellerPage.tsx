import React, { useEffect, useRef, useState } from 'react'
import {
  Room,
  createLocalTracks,
  LocalAudioTrack,
  LocalVideoTrack,
  LocalTrack
} from 'livekit-client'
import { connectToRoom } from '../src/services/LiveKitService'

const SellerPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [room, setRoom] = useState<Room | null>(null)

  const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL || ''
  const roomName = 'default-room'
  const identity = 'seller-' + Math.floor(Math.random() * 10000)
  const role = 'publisher'

  useEffect(() => {
    const startLivestream = async () => {
      try {
        // Bước 1: Lấy track video và audio riêng biệt
        const tracks = await createLocalTracks({
          audio: true,
          video: true
        })

        const res = await fetch(`/api/token?room=${roomName}&identity=${identity}&role=${role}`)
        const data = await res.json()
        const token = data.token

        const connectedRoom = await connectToRoom(serverUrl, token, (joinedRoom) => {
          setRoom(joinedRoom)
        })

        // Bước 2: Publish từng track
        for (const track of tracks) {
          console.log('📡 Publishing track:', track.kind)
          await connectedRoom.localParticipant.publishTrack(track)
        }

        // Bước 3: Hiển thị video local
        const videoTrack = tracks.find((t) => t.kind === 'video') as LocalVideoTrack
        if (videoTrack && videoRef.current) {
          const stream = new MediaStream([videoTrack.mediaStreamTrack])
          videoRef.current.srcObject = stream
          videoRef.current.muted = true // tránh tiếng vọng khi seller xem lại chính mình
          await videoRef.current.play()
        }

        // (Không cần xử lý audio local vì đã publish rồi)
      } catch (err) {
        console.error('🚨 Lỗi livestream:', err)
      }
    }

    startLivestream()

    return () => {
      room?.disconnect()
    }
  }, [])

  return (
    <div>
      <h2>🔴 Seller Livestream</h2>
      <video ref={videoRef} autoPlay playsInline style={{ width: '100%', borderRadius: 8 }} />
    </div>
  )
}

export default SellerPage
