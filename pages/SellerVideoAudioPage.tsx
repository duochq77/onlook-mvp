import React, { useEffect, useRef, useState } from 'react'
import { connectToRoom } from '../src/services/LiveKitService'

const SellerVideoAudioPage: React.FC = () => {
    const videoPreviewRef = useRef<HTMLVideoElement>(null)
    const [room, setRoom] = useState<any>(null)
    const [videoFile, setVideoFile] = useState<File | null>(null)
    const [audioFile, setAudioFile] = useState<File | null>(null)
    const [isStreaming, setIsStreaming] = useState(false)

    const startStreaming = async () => {
        if (!videoFile || !audioFile) {
            alert('❌ Vui lòng chọn cả file video và file audio trước khi bắt đầu!')
            return
        }

        const newRoom = await connectToRoom()
        setRoom(newRoom)

        // 🎬 Video element từ file
        const videoURL = URL.createObjectURL(videoFile)
        const videoElement = document.createElement('video')
        videoElement.src = videoURL
        videoElement.muted = true
        videoElement.loop = true

        await new Promise((resolve) => {
            videoElement.onloadedmetadata = resolve
        })
        await videoElement.play()

        const videoStream = (videoElement as any).captureStream()
        const videoTrack = videoStream?.getVideoTracks?.()[0]

        // 🔊 Audio element từ file
        const audioURL = URL.createObjectURL(audioFile)
        const audioElement = document.createElement('audio')
        audioElement.src = audioURL
        audioElement.loop = true

        await new Promise((resolve) => {
            audioElement.onloadedmetadata = resolve
        })
        await audioElement.play()

        const audioStream = (audioElement as any).captureStream()
        const audioTrack = audioStream?.getAudioTracks?.()[0]

        // ✅ Gửi track vào room nếu tồn tại
        if (videoTrack) await newRoom.localParticipant.publishTrack(videoTrack)
        if (audioTrack) await newRoom.localParticipant.publishTrack(audioTrack)

        // 👀 Preview video
        if (videoPreviewRef.current) {
            videoPreviewRef.current.srcObject = videoStream
            videoPreviewRef.current.play()
        }

        setIsStreaming(true)
    }

    return (
        <div>
            <h1>📦 Livestream từ Video + Audio File</h1>
            <input type="file" accept="video/mp4" onChange={(e) => setVideoFile(e.target.files?.[0] || null)} />
            <input type="file" accept="audio/mp3" onChange={(e) => setAudioFile(e.target.files?.[0] || null)} />
            <button onClick={startStreaming} disabled={isStreaming}>
                {isStreaming ? '🔴 Đang phát...' : '🚀 Bắt đầu Livestream'}
            </button>

            <h2>👀 Xem thử video đang phát:</h2>
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
