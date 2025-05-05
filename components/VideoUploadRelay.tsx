// File: components/VideoUploadRelay.tsx
import React, { useRef } from 'react';

interface VideoUploadRelayProps {
  onFileSelected: (file: File) => void;
}

const VideoUploadRelay: React.FC<VideoUploadRelayProps> = ({ onFileSelected }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelected(file);
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Tải video phát lại</button>
      <input
        type="file"
        accept="video/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default VideoUploadRelay;
