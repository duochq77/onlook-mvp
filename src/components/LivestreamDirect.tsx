import { useMediaDevices } from '@livekit/components-react'
import { useEffect } from 'react'

export default function LivestreamDirect() {
  const mediaDevices = useMediaDevices()

  useEffect(() => {
    console.log('Media devices:', mediaDevices)
  }, [mediaDevices])

  return (
    <div>
      <h2>Livestream trực tiếp</h2>
      <pre>{JSON.stringify(mediaDevices, null, 2)}</pre>
    </div>
  )
}
