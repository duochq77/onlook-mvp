import React, { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'

const LivestreamDirect = dynamic(() => import('../components/LivestreamDirect'), { ssr: false })
const LivestreamHybrid = dynamic(() => import('../components/LivestreamHybrid'), { ssr: false })
const LivestreamDualFile = dynamic(() => import('../components/LivestreamDualFile'), { ssr: false })
const VideoUploadRelay = dynamic(() => import('../components/VideoUploadRelay'), { ssr: false })

const SellerPage: React.FC = () => {
  const [mode, setMode] = useState<string>('direct')
  const [link, setLink] = useState<string>('')

  const pageRef = useRef<HTMLDivElement>(null)

  // Khi bắt đầu livestream thì khóa toàn màn hình
  useEffect(() => {
    const blockExit = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }

    if (mode) {
      window.addEventListener('beforeunload', blockExit)
    }

    return () => {
      window.removeEventListener('beforeunload', blockExit)
    }
  }, [mode])

  return (
    <div ref={pageRef} className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">🧑‍💼 Giao diện người bán</h1>

      <label className="block mb-2">🔗 Link giới thiệu sản phẩm (nếu có):</label>
      <input
        type="text"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="https://facebook.com/yourpage"
        className="w-full mb-4 p-2 rounded bg-gray-800 border border-gray-600"
      />

      <label className="block mb-2">🎬 Chọn hình thức livestream:</label>
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-600"
      >
        <option value="direct">1️⃣ Livestream trực tiếp video + audio</option>
        <option value="hybrid">2️⃣ Video webcam, audio từ file</option>
        <option value="dualfile">3️⃣ Video + Audio từ 2 file riêng</option>
        <option value="replay">4️⃣ Phát file video có sẵn audio</option>
      </select>

      <div className="border rounded-xl p-4 bg-black">
        {mode === 'direct' && <LivestreamDirect link={link} />}
        {mode === 'hybrid' && <LivestreamHybrid link={link} />}
        {mode === 'dualfile' && <LivestreamDualFile link={link} />}
        {mode === 'replay' && <VideoUploadRelay link={link} />}
      </div>
    </div>
  )
}

export default SellerPage
