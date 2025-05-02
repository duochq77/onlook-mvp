import { useMediaDevices } from '@livekit/components-react'
import { useEffect } from 'react'

export default function LivestreamDirect() {
  // ✅ Sửa lỗi TS2554 bằng cách truyền callback vào useMediaDevices
  const devices = useMediaDevices((devices) => devices)

  useEffect(() => {
    console.log('Thiết bị đang có:', devices)
  }, [devices])

  return (
    <div>
      <h2>Livestream trực tiếp</h2>
      <ul>
        {devices.map((d, idx) => (
          <li key={idx}>{d.label || 'Thiết bị không tên'}</li>
        ))}
      </ul>
    </div>
  )
}
