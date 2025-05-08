import React, { useRef, useEffect } from 'react'

interface Props {
  stream: MediaStream | null
}

export const LivestreamDirect: React.FC<Props> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream
    }
  }, [stream])

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      className="w-full h-full object-cover rounded-xl"
    />
  )
}
