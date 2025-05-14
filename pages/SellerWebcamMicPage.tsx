import React, { useEffect, useRef, useState } from 'react'
import { Room } from 'livekit-client'
import { connectToRoom } from '@/services/LiveKitService'

const SellerWebcamMicPage: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [room, setRoom] = useState<Room | null>(null)

    const roomName = 'default-room'
    const identity = 'seller-' + Math.floor(Math.random() * 10000)
    const role = 'publisher'
    const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL || ''

    useEffect(() => {
        const startLivestream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })

                if (videoRef.current) {
                    videoRef.current.srcObject = stream
                    await videoRef.current.play()
                }

                const videoTrack = stream.getVideoTracks()[0]
                const audioTrack = stream.getAudioTracks()[0]

                const tokenRes = await fetch(`/api/token?room=${roomName}&identity=${identity}&role=${role}`)
                const { token } = await tokenRes.json()

                const room = await connectToRoom(serverUrl, token, () => { }, () => { })
                setRoom(room)

                await room.localParticipant.publishTrack(videoTrack)
                await room.localParticipant.publishTrack(audioTrack)

                console.log('📡 Đã bắt đầu livestream bằng webcam + mic')
            } catch (err) {
                console.error('❌ Lỗi livestream:', err)
            }
        }

        startLivestream()

        return () => {
            room?.disconnect()
        }
    }, [])

    return (
        <div style={{ padding: 20 }}>
            <h2>🎥 Livestream bằng webcam + mic</h2>
            <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', borderRadius: 8 }} />
        </div>
    )
}

export default SellerWebcamMicPage
