import type { NextApiRequest, NextApiResponse } from 'next'
import formidable, { File } from 'formidable'
import fs from 'fs'
import path from 'path'

// Tắt bodyParser mặc định để dùng formidable
export const config = {
    api: {
        bodyParser: false,
    },
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    const uploadDir = path.join(process.cwd(), 'public', 'sample-videos')
    fs.mkdirSync(uploadDir, { recursive: true })

    const form = formidable({ uploadDir, keepExtensions: true, maxFiles: 1 })

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error('❌ Upload error:', err)
            return res.status(500).json({ error: 'Lỗi khi upload file' })
        }

        const fileItem = Array.isArray(files.video) ? files.video[0] : files.video

        if (!fileItem || typeof fileItem !== 'object' || !('originalFilename' in fileItem)) {
            return res.status(400).json({ error: 'Không có file video hợp lệ' })
        }

        const uploadedFile = fileItem as File
        const tempPath = uploadedFile.filepath
        const fileName = uploadedFile.originalFilename?.replace(/\s+/g, '_') || 'uploaded_video.mp4'
        const newPath = path.join(uploadDir, fileName)

        fs.rename(tempPath, newPath, (renameErr) => {
            if (renameErr) {
                console.error('❌ Rename error:', renameErr)
                return res.status(500).json({ error: 'Không thể lưu file' })
            }

            return res.status(200).json({ message: 'Upload thành công', file: fileName })
        })
    })
}
