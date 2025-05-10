import React, { useEffect, useRef, useState } from 'react'
import {
    Room,
    RemoteTrack,
    RemoteTrackPublication,
    RemoteAudioTrack,
    RemoteVideoTrack,
} from 'livekit-client'
import { connectToRoom } from '../src/services/LiveKitService'

const ViewerPage: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const audioRef = useRef<HTMLAudioElement>(null)
    const [room, setRoom] = useState<Room | null>(null)
    const [hasStarted, setHasStarted] = useState(false)

    const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL || ''
    const roomName = 'default-room'
    const identity = 'viewer-' + Math.floor(Math.random() * 10000)
    const role = 'subscriber'

    const handleStart = () => {
        setHasStarted(true)
    }

    useEffect(() => {
        if (!hasStarted) return

        const onTrackSubscribed = (
            track: RemoteTrack,
            publication: RemoteTrackPublication,
            participant: any
        ) => {
            console.log('🔗 Subscribed track:', track.kind)

            if (track.kind === 'video' && videoRef.current) {
                const mediaStream = new MediaStream([track.mediaStreamTrack])
                videoRef.current.srcObject = mediaStream
                videoRef.current.play().catch((err) => console.error('Video play error:', err))
            }

            if (track.kind === 'audio' && audioRef.current) {
                const mediaStream = new MediaStream([track.mediaStreamTrack])
                audioRef.current.srcObject = mediaStream
                audioRef.current.play().catch((err) => console.error('Audio play error:', err))
            }
        }

        const startViewing = async () => {
            try {
                const res = await fetch(`/api/token?room=${roomName}&identity=${identity}&role=${role}`)
                const data = await res.json()
                const token = data.token

                const connectedRoom = await connectToRoom(serverUrl, token, (joinedRoom) => {
                    setRoom(joinedRoom)
                }, onTrackSubscribed)
            } catch (err) {
                console.error('❌ Failed to connect as viewer:', err)
            }
        }

        startViewing()

        return () => {
            room?.disconnect()
        }
    }, [hasStarted])

    return (
        <div>
            <h2>👀 Viewer Page</h2>
            {!hasStarted ? (
                <button onClick={handleStart} style={{ fontSize: '1rem', padding: '1rem' }}>
                    ▶️ Bắt đầu xem livestream
                </button>
            ) : (
                <>
                    <video ref={videoRef} autoPlay playsInline style={{ width: '100%', borderRadius: 8 }} />
                    <audio ref={audioRef} autoPlay controls />
                </>
            )}
        </div>
    )
}

export default ViewerPage
