import React from 'react';

interface Props {
  onStart: () => void;
  onStop: () => void;
  isStreaming: boolean;
}

const LivestreamDirect: React.FC<Props> = ({ onStart, onStop, isStreaming }) => {
  return (
    <div className="p-4 bg-white shadow rounded-xl max-w-md">
      <h2 className="text-xl font-semibold mb-4">🎥 Livestream trực tiếp</h2>
      {isStreaming ? (
        <button
          onClick={onStop}
          className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
        >
          Dừng phát
        </button>
      ) : (
        <button
          onClick={onStart}
          className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
        >
          Bắt đầu phát
        </button>
      )}
    </div>
  );
};

export default LivestreamDirect;
