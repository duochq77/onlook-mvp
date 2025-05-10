// src/components/VideoUploadRelay.tsx
import React, { useRef } from 'react'

interface Props {
  link: string
}

const VideoUploadRelay: React.FC<Props> = ({ link }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleSelectVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && videoRef.current) {
      const url = URL.createObjectURL(file)
      videoRef.current.src = url
      videoRef.current.play().catch(() => { })
    }
  }

  return (
    <div className="relative w-full">
      {link && (
        <div className="mb-2 text-blue-400 underline break-words">
          🔗 <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
        </div>
      )}
      <label className="block mb-2 font-medium">🎞️ Chọn video từ thiết bị:</label>
      <input
        type="file"
        accept="video/*"
        onChange={handleSelectVideo}
        className="mb-4"
      />
      <video
        ref={videoRef}
        controls
        autoPlay
        loop
        className="w-full rounded-lg bg-black"
      />
    </div>
  )
}

export default VideoUploadRelay
