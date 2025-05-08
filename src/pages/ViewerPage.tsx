import React, { useEffect, useRef, useState } from 'react'
import { Room } from 'livekit-client'
import { useRouter } from 'next/router'

const ViewerPage: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const audioRef = useRef<HTMLAudioElement>(null)
    const [room, setRoom] = useState<Room | null>(null)
    const [usingSampleVideo, setUsingSampleVideo] = useState(false)
    const router = useRouter()

    const roomName = 'default-room'
    const identity = 'viewer-' + Math.floor(Math.random() * 10000)
    const role = 'subscriber'
    const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL || ''

    const touchStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
    const touchEnd = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

    useEffect(() => {
        const startViewing = async () => {
            const sampleVideoFromQuery = router.query.video as string | undefined

            if (sampleVideoFromQuery) {
                playSampleVideo(decodeURIComponent(sampleVideoFromQuery))
                return
            }

            try {
                const res = await fetch(
                    `/api/token?room=${roomName}&identity=${identity}&role=${role}`
                )
                const data = await res.json()

                const newRoom = new Room()
                await newRoom.connect(serverUrl, data.token)
                setRoom(newRoom)

                let hasTrack = false

                newRoom.on('trackSubscribed', (track) => {
                    hasTrack = true
                    if (track.kind === 'video' && videoRef.current) {
                        track.attach(videoRef.current)
                    } else if (track.kind === 'audio' && audioRef.current) {
                        track.attach(audioRef.current)
                        audioRef.current.play().catch((err) => {
                            console.warn('Audio autoplay blocked:', err)
                        })
                    }
                })

                setTimeout(() => {
                    if (!hasTrack) {
                        newRoom.disconnect()
                        playSampleVideo()
                    }
                }, 5000)
            } catch (err) {
                console.warn('❌ Không thể kết nối room:', err)
                playSampleVideo()
            }
        }

        const playSampleVideo = (src?: string) => {
            setUsingSampleVideo(true)
            if (videoRef.current) {
                const demoList = ['demo1.mp4', 'demo2.mp4']
                const selected =
                    src || `/sample-videos/${demoList[Math.floor(Math.random() * demoList.length)]}`
                videoRef.current.src = selected
                videoRef.current.loop = true
                videoRef.current.controls = true
                videoRef.current.play().catch(() => { })
            }
        }

        startViewing()

        const handleTouchStart = (e: TouchEvent) => {
            const touch = e.touches[0]
            touchStart.current = { x: touch.clientX, y: touch.clientY }
        }

        const handleTouchEnd = (e: TouchEvent) => {
            const touch = e.changedTouches[0]
            touchEnd.current = { x: touch.clientX, y: touch.clientY }

            const dx = touchEnd.current.x - touchStart.current.x
            const dy = touchEnd.current.y - touchStart.current.y

            if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 50) {
                if (dy < 0) console.log('⬆️ Vuốt lên: chuyển video tiếp theo')
                else console.log('⬇️ Vuốt xuống: chuyển video trước')
            }

            if (dx < -100) {
                console.log('⬅️ Vuốt trái mạnh: chuyển sang GridViewer9')
                router.push('/GridViewer9')
            }
        }

        window.addEventListener('touchstart', handleTouchStart)
        window.addEventListener('touchend', handleTouchEnd)

        return () => {
            window.removeEventListener('touchstart', handleTouchStart)
            window.removeEventListener('touchend', handleTouchEnd)
            room?.disconnect()
        }
    }, [router.query.video])

    return (
        <div className="p-4 flex flex-col items-center justify-center min-h-screen bg-black text-white">
            <h1 className="text-2xl font-semibold mb-4">
                {usingSampleVideo ? '🎞 Đang phát video mẫu' : '🎥 Giao diện người xem'}
            </h1>
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                loop={usingSampleVideo}
                controls={usingSampleVideo}
                className="w-full max-w-md rounded-xl border border-gray-600"
                onTouchStart={() => {
                    if (videoRef.current) {
                        videoRef.current.muted = true
                        videoRef.current.play().catch(() => { })
                    }
                }}
                onClick={() => {
                    if (videoRef.current?.requestFullscreen) {
                        videoRef.current.requestFullscreen()
                    }
                }}
            />
            <audio ref={audioRef} autoPlay />
        </div>
    )
}

export default ViewerPage
