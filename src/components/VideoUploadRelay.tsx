import React, { useEffect } from 'react'

export default function VideoUploadRelay() {
  useEffect(() => {
    const video = document.querySelector('video') as HTMLVideoElement & {
      captureStream?: () => MediaStream
    }

    if (video && typeof video.captureStream === 'function') {
      const stream = video.captureStream()
      console.log('✅ Captured stream:', stream)
    } else {
      console.warn('⚠️ Trình duyệt này không hỗ trợ captureStream().')
    }
  }, [])

  return (
    <div>
      <h2>🔁 Phát lại video từ file</h2>
      <video src="/sample.mp4" controls width="480" />
    </div>
  )
}
