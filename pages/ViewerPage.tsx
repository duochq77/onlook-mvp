import React, { useEffect, useRef, useState } from 'react'
import { connectToRoom } from '../src/services/LiveKitService'

const ViewerPage: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [room, setRoom] = useState<any>(null)

    const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL || ''
    const roomName = 'default-room'
    const identity = 'viewer-' + Math.floor(Math.random() * 10000)

    useEffect(() => {
        const startViewing = async () => {
            const newRoom = await connectToRoom()
            setRoom(newRoom)

            // Khi có track được gửi từ seller
            newRoom.on('trackSubscribed', (track, publication, participant) => {
                if (track.kind === 'video' && videoRef.current) {
                    const mediaStream = new MediaStream([track.mediaStreamTrack])
                    videoRef.current.srcObject = mediaStream
                    videoRef.current.play()
                }

                if (track.kind === 'audio') {
                    const audio = new Audio()
                    audio.srcObject = new MediaStream([track.mediaStreamTrack])
                    audio.play()
                }
            })
        }

        startViewing()
    }, [])

    return (
        <div>
            <h1>👁️ Người Xem Livestream</h1>
            <video ref={videoRef} autoPlay playsInline controls style={{ width: '100%', maxWidth: 600 }} />
        </div>
    )
}

export default ViewerPage
