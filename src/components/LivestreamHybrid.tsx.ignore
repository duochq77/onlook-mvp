// src/components/LivestreamHybrid.tsx
import React, { useEffect, useRef } from 'react'

interface Props {
    link: string
}

const LivestreamHybrid: React.FC<Props> = ({ link }) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
            if (videoRef.current) {
                videoRef.current.srcObject = stream
            }
        })
    }, [])

    return (
        <div className="relative w-full">
            {link && (
                <div className="mb-2 text-blue-400 underline break-words">
                    🔗 <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                </div>
            )}
            <video ref={videoRef} autoPlay muted playsInline className="w-full rounded-lg" />
            <audio ref={audioRef} src="/audio-loop.mp3" autoPlay loop />
        </div>
    )
}

export default LivestreamHybrid
