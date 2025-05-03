import React, { useEffect } from 'react'
import { useMediaDevices } from '@livekit/components-react'

export default function LivestreamDirect() {
  const videoDevices = useMediaDevices({ kind: 'videoinput' })

  useEffect(() => {
    console.log('Camera devices:', videoDevices)
  }, [videoDevices])

  return (
    <div>
      <h2>Camera hiện có:</h2>
      <ul>
        {videoDevices.map((d, idx) => (
          <li key={idx}>{d.label || 'Không tên'}</li>
        ))}
      </ul>
    </div>
  )
}
