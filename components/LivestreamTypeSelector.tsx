// File: components/LivestreamTypeSelector.tsx
import React from 'react';

interface LivestreamTypeSelectorProps {
  onSelect: (type: 'direct' | 'upload') => void;
}

const LivestreamTypeSelector: React.FC<LivestreamTypeSelectorProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-col items-center space-y-4 mt-10">
      <h2 className="text-xl font-semibold">Chọn hình thức livestream:</h2>
      <div className="space-x-4">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          onClick={() => onSelect('direct')}
        >
          Phát trực tiếp
        </button>
        <button
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          onClick={() => onSelect('upload')}
        >
          Phát lại video có sẵn
        </button>
      </div>
    </div>
  );
};

export default LivestreamTypeSelector;
