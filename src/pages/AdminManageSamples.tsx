import React, { useEffect, useState } from 'react'

const AdminManageSamples: React.FC = () => {
    const [videos, setVideos] = useState<string[]>([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        // Lấy danh sách file trong thư mục public/sample-videos
        fetch('/sample-videos/index.json')
            .then((res) => res.json())
            .then((data) => setVideos(data.files))
            .catch(() => setMessage('Không thể tải danh sách video'))
    }, [])

    const handleDelete = async (filename: string) => {
        const res = await fetch('/api/delete-sample', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename }),
        })

        if (res.ok) {
            setVideos((prev) => prev.filter((f) => f !== filename))
            setMessage('✅ Đã xóa: ' + filename)
        } else {
            setMessage('❌ Không thể xóa')
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-xl font-bold mb-4">🧹 Admin: Xóa video mẫu</h1>
            {message && <p className="mb-4">{message}</p>}
            <ul className="space-y-2">
                {videos.map((filename) => (
                    <li key={filename} className="flex justify-between bg-gray-800 p-2 rounded">
                        <span>{filename}</span>
                        <button onClick={() => handleDelete(filename)} className="bg-red-600 px-3 py-1 rounded">
                            Xóa
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AdminManageSamples

