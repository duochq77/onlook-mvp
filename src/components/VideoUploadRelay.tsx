import { useEffect } from 'react'

export default function VideoUploadRelay() {
  useEffect(() => {
    const video = document.querySelector('video') as HTMLVideoElement & {
      captureStream?: () => MediaStream
    }

    if (video && typeof video.captureStream === 'function') {
      const stream = video.captureStream()
      console.log('Captured stream:', stream)
    } else {
      console.warn('captureStream is not supported in this browser.')
    }
  }, [])

  return (
    <div>
      <video src="/sample.mp4" controls></video>
    </div>
  )
}
