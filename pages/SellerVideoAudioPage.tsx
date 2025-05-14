import React, { useRef, useState } from 'react'
import { connectToRoom } from '../src/services/LiveKitService'
import { Room } from 'livekit-client'

const SellerVideoAudioPage: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [processing, setProcessing] = useState(false)

    const handleStart = async () => {
        const videoInput = document.getElementById('video') as HTMLInputElement
        const audioInput = document.getElementById('audio') as HTMLInputElement

        if (!videoInput?.files?.[0] || !audioInput?.files?.[0]) {
            alert('Vui lòng chọn cả video và audio!')
            return
        }

        setProcessing(true)

        const formData = new FormData()
        formData.append('video', videoInput.files[0])
        formData.append('audio', audioInput.files[0])

        try {
            const res = await fetch('https://onlook-video-server.onrender.com/process', {
                method: 'POST',
                body: formData,
            })

            if (!res.ok) throw new Error('Lỗi từ server hoặc file không hợp lệ')

            const blob = await res.blob()
            const videoURL = URL.createObjectURL(blob)

            if (videoRef.current) {
                videoRef.current.src = videoURL
                videoRef.current.loop = true
                videoRef.current.load()
                await videoRef.current.play().catch((e) => {
                    console.warn('⚠️ Trình duyệt ngăn tự động phát:', e)
                })
            }

            const stream = videoRef.current.captureStream()
            const videoTrack = stream.getVideoTracks()[0]
            const audioTrack = stream.getAudioTracks()[0]

            console.log('🎥 VideoTrack:', videoTrack)
            console.log('🔊 AudioTrack:', audioTrack)

            const roomName = 'default-room'
            const identity = 'seller-' + Math.floor(Math.random() * 10000)
            const role = 'publisher'
            const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL || ''

            const tokenRes = await fetch(`/api/token?room=${roomName}&identity=${identity}&role=${role}`)
            const tokenData = await tokenRes.json()
            const token = tokenData.token

            console.log('🔑 Token:', token)

            const onTrackSubscribed = () => { } // tránh lỗi thiếu callback
            const room: Room = await connectToRoom(serverUrl, token, () => { }, onTrackSubscribed)

            await room.localParticipant.publishTrack(videoTrack)
            await room.localParticipant.publishTrack(audioTrack)

            console.log('📡 Đã publish cả video và audio track!')
        } catch (err) {
            console.error('❌ Lỗi xử lý hoặc livestream:', err)
            alert('Không thể phát video đã xử lý!')
        } finally {
            setProcessing(false)
        }
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>🎥 Livestream từ video + audio file</h2>

            <div style={{ marginBottom: 10 }}>
                <label>Chọn video (.mp4): </label>
                <input type="file" id="video" accept="video/mp4" />
            </div>

            <div style={{ marginBottom: 10 }}>
                <label>Chọn audio (.mp3): </label>
                <input type="file" id="audio" accept="audio/mp3" />
            </div>

            <button onClick={handleStart} disabled={processing}>
                {processing ? '⏳ Đang xử lý...' : '🚀 Bắt đầu livestream'}
            </button>

            <div style={{ marginTop: 20 }}>
                <video
                    ref={videoRef}
                    controls
                    autoPlay
                    playsInline
                    loop
                    style={{ width: '100%', maxWidth: 600, border: '2px solid #ccc', marginTop: 20 }}
                />
            </div>
        </div>
    )
}

export default SellerVideoAudioPage
