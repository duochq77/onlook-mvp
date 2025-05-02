import { useMediaDevices } from '@livekit/components-react'
import { useEffect } from 'react'

export default function LivestreamDirect() {
  // ✅ Không truyền gì vào -> lấy toàn bộ thiết bị (âm thanh + hình ảnh)
  const devices = useMediaDevices()

  useEffect(() => {
    console.log('Thiết bị đang có:', devices)
  }, [devices])

  return (
    <div>
      <h2>Livestream trực tiếp</h2>
      <ul>
        {devices.map((d, idx) => (
          <li key={idx}>{d.label || '(Không tên)'}</li>
        ))}
      </ul>
    </div>
  )
}
