import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Chỉ hỗ trợ POST' })
    }

    const { filename } = req.body
    if (!filename) {
        return res.status(400).json({ error: 'Thiếu tên file cần xóa' })
    }

    const filePath = path.join(process.cwd(), 'public', 'sample-videos', filename)

    try {
        fs.unlinkSync(filePath)
        return res.status(200).json({ message: 'Đã xóa thành công' })
    } catch (err) {
        console.error('Lỗi khi xóa:', err)
        return res.status(500).json({ error: 'Không thể xóa file' })
    }
}
