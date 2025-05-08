// pages/index.tsx
import React from 'react'
import Link from 'next/link'

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">🎥 Chào mừng đến với Onlook</h1>
            <p className="text-lg mb-8">Chọn vai trò để bắt đầu:</p>
            <div className="flex space-x-4">
                <Link href="/SellerPage" className="px-6 py-3 bg-green-600 text-white rounded-xl">
                    Người Bán
                </Link>
                <Link href="/ViewerPage" className="px-6 py-3 bg-blue-600 text-white rounded-xl">
                    Người Xem
                </Link>
            </div>
            <p className="mt-8 text-sm text-gray-500">✅ Trang index.tsx đã render thành công (Debug Marker)</p>
        </div>
    )
}
