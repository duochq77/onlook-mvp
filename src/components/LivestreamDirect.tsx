import { useMediaDevices } from '@livekit/components-react'
import { useEffect } from 'react'

// ✅ Chọn loại thiết bị cần lấy, ví dụ: 'videoinput' để lấy camera
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
