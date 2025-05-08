import React, { useState } from 'react'

const AdminUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null)
    const [message, setMessage] = useState<string>('')

    const handleUpload = async () => {
        if (!file) {
            setMessage('❌ Bạn chưa chọn file')
            return
        }

        const formData = new FormData()
        formData.append('video', file)

        const res = await fetch('/api/upload-sample', {
            method: 'POST',
            body: formData,
        })

        if (res.ok) {
            setMessage('✅ Upload thành công')
        } else {
            setMessage('❌ Upload thất bại')
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-xl font-bold mb-4">🛠️ Admin: Upload video mẫu</h1>

            <input
                type="file"
                accept="video/mp4"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="mb-4"
            />

            <button
                onClick={handleUpload}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            >
                Tải lên
            </button>

            {message && <p className="mt-4">{message}</p>}
        </div>
    )
}

export default AdminUpload
