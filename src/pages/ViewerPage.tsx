import { useEffect, useState } from 'react'
import { LiveKitRoom, RoomAudioRenderer } from '@livekit/components-react'

export function ViewerPage() {
  const [token, setToken] = useState<string | null>(null)
  const [audioStarted, setAudioStarted] = useState(false)

  useEffect(() => {
    const fetchToken = async () => {
      const resp = await fetch('/api/viewer-token?room=a')
      const data = await resp.json()
      setToken(data.token)
    }
    fetchToken()
  }, [])

  const tryStartAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      stream.getTracks().forEach(track => track.stop()) // đóng ngay track giả
      setAudioStarted(true)
    } catch (err: any) {
      console.error('Không thể khởi động âm thanh:', err)
    }
  }

  if (!token) return <div>Đang kết nối tới phòng livestream...</div>

  return (
    <LiveKitRoom
      token={token}
      serverUrl="wss://onlook-dev-zvm78p9y.livekit.cloud"
      connect={true}
    >
      <RoomAudioRenderer />
      {!audioStarted && (
        <button
          onClick={tryStartAudio}
          style={{ padding: '12px 20px', fontSize: '16px', marginTop: '20px' }}
        >
          🔊 Bấm để bật âm thanh
        </button>
      )}
    </LiveKitRoom>
  )
}
