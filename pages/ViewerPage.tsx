import React, { useEffect, useRef, useState } from 'react'
import { Room, RemoteTrack, RemoteTrackPublication } from 'livekit-client'
import { connectToRoom } from '../src/services/LiveKitService'

const ViewerPage: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [room, setRoom] = useState<Room | null>(null)

    const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL || ''
    const roomName = 'default-room'
    const identity = 'viewer-' + Math.floor(Math.random() * 10000)
    const role = 'subscriber'

    useEffect(() => {
        const onTrackSubscribed = (
            track: RemoteTrack,
            publication: RemoteTrackPublication,
            participant: any
        ) => {
            if (track.kind === 'video' && videoRef.current) {
                const mediaStream = new MediaStream([track.mediaStreamTrack])
                videoRef.current.srcObject = mediaStream
                videoRef.current.play().catch((err) =>
                    console.error('Video play error:', err)
                )
                console.log('📺 Video đã được attach')
            }
        }

        const startViewing = async () => {
            try {
                console.log('🌐 Viewer đang dùng server URL:', serverUrl)

                const res = await fetch(
                    `/api/token?room=${roomName}&identity=${identity}&role=${role}`
                )
                const data = await res.json()
                const token = data.token

                console.log('🎫 Nhận được token:', token)

                const connectedRoom = await connectToRoom(
                    serverUrl,
                    token,
                    (joinedRoom) => {
                        setRoom(joinedRoom)
                    },
                    onTrackSubscribed
                )
            } catch (err) {
                console.error('❌ Failed to connect as viewer:', err)
            }
        }

        startViewing()

        return () => {
            room?.disconnect()
        }
    }, [])

    return (
        <div style={{ padding: 20 }}>
            <h2>👀 Viewer Page</h2>
            <video
                ref={videoRef}
                autoPlay
                playsInline
                controls
                style={{
                    width: '100%',
                    maxWidth: 600,
                    border: '2px solid #ccc',
                    marginTop: 20,
                }}
            />
        </div>
    )
}

export default ViewerPage
