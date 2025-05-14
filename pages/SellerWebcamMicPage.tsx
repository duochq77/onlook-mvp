import React, { useEffect, useRef, useState } from 'react'
import { connectToRoom } from '../src/services/LiveKitService'

const SellerWebcamMicPage: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [room, setRoom] = useState<any>(null)

    const roomName = 'default-room'
    const identity = 'seller-' + Math.floor(Math.random() * 10000)

    useEffect(() => {
        const startLivestream = async () => {
            const newRoom = await connectToRoom()
            setRoom(newRoom)

            // Nếu cần hiển thị preview thì dùng newRoom.localParticipant...
        }

        startLivestream()
    }, [])

    return (
        <div>
            <h1>Livestream Webcam + Mic</h1>
            <video ref={videoRef} autoPlay playsInline muted />
        </div>
    )
}

export default SellerWebcamMicPage
