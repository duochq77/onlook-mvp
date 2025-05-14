import React, { useRef, useState, useEffect } from 'react'
import { connectToRoom } from '../src/services/LiveKitService'

const SellerVideoAudioPage: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [room, setRoom] = useState<any>(null)

    useEffect(() => {
        const startLivestream = async () => {
            const newRoom = await connectToRoom()
            setRoom(newRoom)

            // Nếu cần hiển thị video local (nếu dùng webcam), thêm logic attach tại đây
            // newRoom.localParticipant?.getTrackPublications()?.forEach(pub => { ... })
        }

        startLivestream()
    }, [])

    return (
        <div>
            <h1>Seller Video + Audio</h1>
            <video ref={videoRef} autoPlay controls muted playsInline />
        </div>
    )
}

export default SellerVideoAudioPage
