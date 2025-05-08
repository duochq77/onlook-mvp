import React from 'react'
import { LIVESTREAM_TYPES } from '@/constants/livestreamTypes'

interface Props {
  selected: string
  onChange: (value: string) => void
}

export const LivestreamTypeSelector: React.FC<Props> = ({ selected, onChange }) => {
  return (
    <div className="flex flex-col space-y-2">
      {LIVESTREAM_TYPES.map((type) => (
        <button
          key={type.id}
          className={`px-4 py-2 border rounded-xl ${selected === type.id ? 'bg-blue-600 text-white' : 'bg-gray-100'
            }`}
          onClick={() => onChange(type.id)}
        >
          {type.label}
        </button>
      ))}
    </div>
  )
}
