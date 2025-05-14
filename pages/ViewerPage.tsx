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
        }

        startViewing()
    }, [])

    return (
        <div>
            <h1>Viewer Livestream</h1>
            <video ref={videoRef} autoPlay controls playsInline />
        </div>
    )
}

export default ViewerPage
