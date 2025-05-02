import { useMediaDevices } from '@livekit/components-react'
import { useEffect } from 'react'

export default function LivestreamDirect() {
  const { devices } = useMediaDevices()

  useEffect(() => {
    console.log('Available media devices:', devices)
  }, [devices])

  return <div>Livestream trực tiếp</div>
}
