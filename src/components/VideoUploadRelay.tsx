import React, { useRef } from 'react';

interface Props {
  onVideoSelected: (file: File) => void;
}

const VideoUploadRelay: React.FC<Props> = ({ onVideoSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onVideoSelected(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="my-4">
      <button
        onClick={triggerUpload}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md"
      >
        Tải video lên để phát
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default VideoUploadRelay;
