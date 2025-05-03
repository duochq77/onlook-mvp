import React from 'react';

interface Props {
  selected: 'direct' | 'replay' | null;
  onSelect: (type: 'direct' | 'replay') => void;
}

const LivestreamTypeSelector: React.FC<Props> = ({ selected, onSelect }) => {
  return (
    <div className="flex gap-4 mb-4">
      <button
        onClick={() => onSelect('direct')}
        className={`px-4 py-2 rounded-xl ${
          selected === 'direct' ? 'bg-blue-600 text-white' : 'bg-gray-200'
        }`}
      >
        Phát trực tiếp
      </button>
      <button
        onClick={() => onSelect('replay')}
        className={`px-4 py-2 rounded-xl ${
          selected === 'replay' ? 'bg-blue-600 text-white' : 'bg-gray-200'
        }`}
      >
        Phát từ video
      </button>
    </div>
  );
};

export default LivestreamTypeSelector;
