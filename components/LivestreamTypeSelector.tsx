import React from 'react';

export type LivestreamType = 'direct' | 'hybrid-audio' | 'full-file';

interface Props {
  selectedType: LivestreamType;
  onSelect: (type: LivestreamType) => void;
}

const LivestreamTypeSelector: React.FC<Props> = ({ selectedType, onSelect }) => {
  return (
    <div className="flex flex-col gap-2 p-4">
      <h2 className="text-xl font-semibold mb-2">Chọn hình thức livestream:</h2>
      <button
        onClick={() => onSelect('direct')}
        className={`p-2 border rounded-xl ${selectedType === 'direct' ? 'bg-blue-500 text-white' : 'bg-white'
          }`}
      >
        1. Phát trực tiếp cả âm thanh và video
      </button>
      <button
        onClick={() => onSelect('hybrid-audio')}
        className={`p-2 border rounded-xl ${selectedType === 'hybrid-audio' ? 'bg-blue-500 text-white' : 'bg-white'
          }`}
      >
        2. Phát video trực tiếp + Âm thanh từ file
      </button>
      <button
        onClick={() => onSelect('full-file')}
        className={`p-2 border rounded-xl ${selectedType === 'full-file' ? 'bg-blue-500 text-white' : 'bg-white'
          }`}
      >
        3. Phát cả video + âm thanh từ file
      </button>
    </div>
  );
};

export default LivestreamTypeSelector;
