// src/pages/GridViewer9.tsx
import React, { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const videoList = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    thumbnail: `https://picsum.photos/id/${100 + i}/300/200`,
    title: `Video ${i + 1}`,
    src: `/sample-videos/demo${(i % 2) + 1}.mp4`, // giả lập link video mẫu
}))

const GridViewer9: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
    const router = useRouter()
    const [selectedVideo, setSelectedVideo] = useState<number | null>(null)
    const touchStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
    const touchEnd = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.style.scrollBehavior = 'smooth'
        }
    }, [])

    const handleClick = (index: number) => {
        setSelectedVideo(index)
        setTimeout(() => {
            const videoSrc = videoList[index].src
            router.push(`/ViewerPage?video=${encodeURIComponent(videoSrc)}`)
        }, 200)
    }

    const handleTouchStart = (e: TouchEvent) => {
        const touch = e.touches[0]
        touchStart.current = { x: touch.clientX, y: touch.clientY }
    }

    const handleTouchEnd = (e: TouchEvent) => {
        const touch = e.changedTouches[0]
        touchEnd.current = { x: touch.clientX, y: touch.clientY }
        const dx = touchEnd.current.x - touchStart.current.x

        if (dx < -100) {
            console.log('⬅️ Vuốt trái mạnh → quay lại menu chính')
            router.push('/')
        }
    }

    useEffect(() => {
        window.addEventListener('touchstart', handleTouchStart)
        window.addEventListener('touchend', handleTouchEnd)
        return () => {
            window.removeEventListener('touchstart', handleTouchStart)
            window.removeEventListener('touchend', handleTouchEnd)
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className="h-screen overflow-y-auto bg-black text-white p-2"
            style={{
                WebkitOverflowScrolling: 'touch',
                overscrollBehavior: 'contain',
                scrollSnapType: 'y mandatory',
            }}
        >
            <h1 className="text-xl text-center font-bold mb-3">
                📺 Chọn video bạn muốn xem
            </h1>
            <div className="grid grid-cols-3 gap-3">
                {videoList.map((video, index) => (
                    <div
                        key={video.id}
                        className="relative rounded-xl overflow-hidden border border-gray-700 shadow-md scroll-snap-align"
                        onClick={() => handleClick(index)}
                        onTouchStart={() => {
                            setSelectedVideo(index)
                            if (videoRefs.current[index]) {
                                videoRefs.current[index]?.play().catch(() => { })
                            }
                        }}
                        onTouchEnd={() => {
                            if (videoRefs.current[index]) {
                                videoRefs.current[index]?.pause()
                                videoRefs.current[index]!.currentTime = 0
                            }
                        }}
                    >
                        <video
                            ref={(el) => {
                                videoRefs.current[index] = el
                            }}
                            src={video.src}
                            muted
                            loop
                            playsInline
                            className="w-full h-24 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-xs p-1 text-center">
                            {video.title}
                        </div>
                        {selectedVideo === index && (
                            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                                <span className="text-sm animate-pulse">🔄 Đang tải...</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GridViewer9
