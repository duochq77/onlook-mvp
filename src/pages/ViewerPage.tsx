import { useEffect, useRef, useState } from 'react'
import { useRoom } from '@livekit/components-react'
import { RoomAudioRenderer, startAudio } from 'livekit-client'

export function ViewerPage() {
  const { connect, room } = useRoom()
  const [joined, setJoined] = useState(false)
  const clicked = useRef(false)

  useEffect(() => {
    const joinRoom = async () => {
      const resp = await fetch('/api/viewer-token?room=a') // nhớ thay 'a' nếu cần
      const { token } = await resp.json()
      await room.connect('wss://onlook-dev-zvm78p9y.livekit.cloud', token)
      setJoined(true)
    }

    joinRoom()
  }, [])

  // fallback để kích hoạt audio
  const handleUserGesture = () => {
    if (!clicked.current) {
      clicked.current = true
      startAudio().then(() => {
        console.log('🔊 AudioContext resumed')
      }).catch(err => {
        console.error('🚫 Failed to resume AudioContext', err)
      })
    }
  }

  return (
    <div onClick={handleUserGesture}>
      <h1>Viewer Page</h1>
      <RoomAudioRenderer room={room} />
      {/* Bạn có thể thêm video render ở đây nếu cần */}
    </div>
  )
}
