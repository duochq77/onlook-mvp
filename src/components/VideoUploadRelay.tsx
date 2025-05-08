import React from 'react'

interface Props {
  onSelect: (file: File) => void
}

export const VideoUploadRelay: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="p-4 border rounded-xl">
      <label className="block mb-2 font-medium">Chọn video từ thiết bị</label>
      <input type="file" accept="video/*" onChange={(e) => {
        const file = e.target.files?.[0]
        if (file) onSelect(file)
      }} />
    </div>
  )
}
