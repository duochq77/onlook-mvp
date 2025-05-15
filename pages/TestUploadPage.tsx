import React, { useState } from 'react'

const TestUploadPage: React.FC = () => {
    const [videoUrl, setVideoUrl] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)

        setLoading(true)
        try {
            const res = await fetch('https://onlook-video-server.onrender.com/process', {
                method: 'POST',
                body: formData,
            })

            if (!res.ok) throw new Error('Lỗi server: ' + res.status)

            const blob = await res.blob()
            const url = URL.createObjectURL(blob)
            setVideoUrl(url)
        } catch (err) {
            alert('❌ Lỗi upload: ' + (err as Error).message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ padding: 24 }}>
            <h1>🧪 Test Upload Video + Audio</h1>
            <form onSubmit={handleUpload} style={{ marginBottom: 16 }}>
                <input type="file" name="video" accept="video/mp4" required />
                <input type="file" name="audio" accept="audio/mp3" required />
                <button type="submit" disabled={loading}>
                    {loading ? '⏳ Đang xử lý...' : '🚀 Gửi tới Render'}
                </button>
            </form>

            {videoUrl && (
                <div>
                    <h2>🎥 Kết quả ghép từ server:</h2>
                    <video src={videoUrl} controls autoPlay style={{ width: '100%', maxWidth: 600 }} />
                </div>
            )}
        </div>
    )
}

export default TestUploadPage
