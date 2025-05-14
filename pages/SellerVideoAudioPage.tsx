import React, { useRef, useState, useEffect } from 'react'
import { connectToRoom } from '../src/services/LiveKitService'
import type { Room } from 'livekit-client'

const SellerVideoAudioPage: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [room, setRoom] = useState<Room | null>(null)

    useEffect(() => {
        const startLivestream = async () => {
            const newRoom = await connectToRoom()
            setRoom(newRoom)
            // Add logic to attach track to videoRef if needed
        }

        startLivestream()
    }, [])

    return (
        <div>
            <h1>Seller Video + Audio from File</h1>
            <video ref={videoRef} autoPlay playsInline controls muted />
        </div>
    )
}

export default SellerVideoAudioPage
