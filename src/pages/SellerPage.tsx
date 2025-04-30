import { useEffect, useRef, useState } from 'react'
import {
  Room,
  RoomEvent,
  createLocalVideoTrack,
  createLocalAudioTrack,
  Track,
} from 'livekit-client'

export function SellerPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [joined, setJoined] = useState(false)
  const roomRef = useRef<Room>()

  useEffect(() => {
    const connectToRoom = async () => {
      const room = new Room()
      roomRef.current = room

      const resp = await fetch('/api/seller-token?room=a') // đổi room nếu cần
      const { token } = await resp.json()

      await room.connect('wss://onlook-dev-zvm78p9y.livekit.cloud', token)

      const videoTrack = await createLocalVideoTrack()
      const audioTrack = await createLocalAudioTrack()

      await room.localParticipant.publishTrack(videoTrack)
      await room.localParticipant.publishTrack(audioTrack)

      // Hiển thị video preview
      if (videoRef.current) {
        videoTrack.attach(videoRef.current)
      }

      // Lắng nghe lỗi (nếu cần)
      room.on(RoomEvent.Disconnected, () => {
        console.log('🚫 Disconnected from room')
      })

      setJoined(true)
    }

    connectToRoom()

    return () => {
      // Cleanup nếu rời trang
      if (roomRef.current) {
        roomRef.current.disconnect()
      }
    }
  }, [])

  return (
    <div>
      <h1>Seller Page</h1>
      <video ref={videoRef} autoPlay muted playsInline style={{ width: '100%' }} />
      {!joined && <p>Đang kết nối...</p>}
    </div>
  )
}
