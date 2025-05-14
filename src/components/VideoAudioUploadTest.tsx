import React, { useState } from 'react'

const VideoAudioUploadTest: React.FC = () => {
    const [videoFile, setVideoFile] = useState<File | null>(null)
    const [audioFile, setAudioFile] = useState<File | null>(null)
    const [message, setMessage] = useState<string>('')

    const handleUpload = async () => {
        if (!videoFile || !audioFile) {
            setMessage('❌ Vui lòng chọn cả video và audio')
            return
        }

        const formData = new FormData()
        formData.append('videoFile', videoFile)
        formData.append('audioFile', audioFile)

        try {
            const res = await fetch('https://onlook-video-server.onrender.com/api/process', {
                method: 'POST',
                body: formData,
            })

            if (!res.ok) throw new Error('❌ Upload thất bại')

            const data = await res.json()
            setMessage(`✅ Thành công: ${JSON.stringify(data)}`)
        } catch (err) {
            setMessage('❌ Lỗi khi gửi file')
            console.error(err)
        }
    }

    return (
        <div>
            <h2>🔧 Test upload Video + Audio lên server Render</h2>
            <input type="file" accept="video/mp4" onChange={(e) => setVideoFile(e.target.files?.[0] || null)} />
            <input type="file" accept="audio/mp3" onChange={(e) => setAudioFile(e.target.files?.[0] || null)} />
            <button onClick={handleUpload}>Gửi lên server</button>
            <p>{message}</p>
        </div>
    )
}

export default VideoAudioUploadTest
