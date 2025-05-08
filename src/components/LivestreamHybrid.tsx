import React, { useEffect, useRef } from 'react'

interface Props {
    videoStream: MediaStream | null
    audioUrl: string
}

export const LivestreamHybrid: React.FC<Props> = ({ videoStream, audioUrl }) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        if (videoRef.current && videoStream) {
            videoRef.current.srcObject = videoStream
        }
    }, [videoStream])

    return (
        <div className="relative w-full h-full">
            <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
            <audio ref={audioRef} src={audioUrl} autoPlay loop />
        </div>
    )
}
