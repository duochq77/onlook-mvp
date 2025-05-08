// src/components/LivestreamDualFile.tsx
import React, { useEffect, useRef } from 'react'

interface Props {
    link: string
}

const LivestreamDualFile: React.FC<Props> = ({ link }) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        if (videoRef.current) videoRef.current.load()
        if (audioRef.current) audioRef.current.load()
    }, [])

    return (
        <div className="relative w-full">
            {link && (
                <div className="mb-2 text-blue-400 underline break-words">
                    🔗 <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                </div>
            )}
            <video
                ref={videoRef}
                src="/sample-videos/demo1.mp4"
                autoPlay
                muted
                playsInline
                loop
                className="w-full rounded-lg"
            />
            <audio ref={audioRef} src="/audio-loop.mp3" autoPlay loop />
        </div>
    )
}

export default LivestreamDualFile
