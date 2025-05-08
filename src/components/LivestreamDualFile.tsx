import React, { useRef, useEffect } from 'react'

interface Props {
    videoUrl: string
    audioUrl: string
}

export const LivestreamDualFile: React.FC<Props> = ({ videoUrl, audioUrl }) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        if (videoRef.current) videoRef.current.load()
        if (audioRef.current) audioRef.current.load()
    }, [videoUrl, audioUrl])

    return (
        <div className="relative w-full h-full">
            <video ref={videoRef} src={videoUrl} autoPlay muted playsInline loop className="w-full h-full object-cover" />
            <audio ref={audioRef} src={audioUrl} autoPlay loop />
        </div>
    )
}
