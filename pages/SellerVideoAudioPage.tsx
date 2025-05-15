import React, { useRef, useState } from 'react'
import { connectToRoom } from '../src/services/LiveKitService'

const SellerVideoAudioPage: React.FC = () => {
    const videoPreviewRef = useRef<HTMLVideoElement>(null)
    const [room, setRoom] = useState<any>(null)
    const [videoFile, setVideoFile] = useState<File | null>(null)
    const [audioFile, setAudioFile] = useState<File | null>(null)
    const [isStreaming, setIsStreaming] = useState(false)

    const startStreaming = async () => {
        if (!videoFile || !audioFile) {
            alert('❌ Vui lòng chọn cả video và audio!')
            return
        }
        // ✅ Force rebuild
        // 🛰 Gửi file lên server Render để xử lý
        const formData = new FormData()
        formData.append('video', videoFile)
        formData.append('audio', audioFile)

        const res = await fetch('https://onlook-video-server.onrender.com/process', {
            method: 'POST',
            body: formData,
        })

        if (!res.ok) {
            alert('❌ Lỗi khi gửi file lên server Render')
            return
        }

        const mergedBlob = await res.blob()
        const mergedUrl = URL.createObjectURL(mergedBlob)

        // 🎬 Tạo video element từ file đã hợp nhất
        const videoElement = document.createElement('video')
        videoElement.src = mergedUrl
        videoElement.loop = true
        videoElement.muted = true
        await videoElement.play()

        const stream = (videoElement as any).captureStream()
        const videoTrack = stream.getVideoTracks()[0]
        const audioTrack = stream.getAudioTracks()[0]

        // 📡 Kết nối LiveKit
        const newRoom = await connectToRoom()
        setRoom(newRoom)

        if (videoTrack) await newRoom.localParticipant.publishTrack(videoTrack)
        if (audioTrack) await newRoom.localParticipant.publishTrack(audioTrack)

        // 👀 Xem preview
        if (videoPreviewRef.current) {
            videoPreviewRef.current.srcObject = stream
            videoPreviewRef.current.play()
        }

        setIsStreaming(true)
    }

    return (
        <div>
            <h1>🎞️ Phát Livestream từ video + audio ghép</h1>
            <input type="file" accept="video/mp4" onChange={(e) => setVideoFile(e.target.files?.[0] || null)} />
            <input type="file" accept="audio/mp3" onChange={(e) => setAudioFile(e.target.files?.[0] || null)} />
            <button onClick={startStreaming} disabled={isStreaming}>
                {isStreaming ? '🔴 Đang phát...' : '🚀 Bắt đầu Livestream'}
            </button>

            <h2>📺 Preview:</h2>
            <video
                ref={videoPreviewRef}
                autoPlay
                muted
                playsInline
                controls
                style={{ width: '100%', maxWidth: 600 }}
            />
        </div>
    )
}

export default SellerVideoAudioPage
