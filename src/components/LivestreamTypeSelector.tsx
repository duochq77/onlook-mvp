import React from 'react'

interface Props {
  onChange: (type: 'live' | 'file') => void
}

export default function LivestreamTypeSelector({ onChange }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as 'live' | 'file'
    onChange(value)
  }

  return (
    <div className="absolute top-4 right-4 z-20 bg-white text-black px-4 py-2 rounded shadow">
      <label className="mr-2 font-bold">Chọn kiểu livestream:</label>
      <select onChange={handleChange} className="border rounded px-2 py-1">
        <option value="live">📡 Phát trực tiếp</option>
        <option value="file">🎞️ Phát video từ ổ đĩa</option>
      </select>
    </div>
  )
}
