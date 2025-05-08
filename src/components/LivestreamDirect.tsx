// File: src/components/LivestreamDirect.tsx
import React, { useEffect, useRef } from 'react'

interface Props {
  link: string
}

const LivestreamDirect: React.FC<Props> = ({ link }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const startStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (err) {
        console.error('Failed to access camera or mic:', err)
      }
    }

    startStream()
  }, [])

  return (
    <div className="relative w-full h-full">
      <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
      {link && (
        <div className="absolute bottom-2 right-2 text-xs text-white bg-black/50 px-2 py-1 rounded">
          <a href={link} target="_blank" rel="noopener noreferrer">🔗 Link giới thiệu</a>
        </div>
      )}
    </div>
  )
}

export default LivestreamDirect
