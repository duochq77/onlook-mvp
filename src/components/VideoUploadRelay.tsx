import { useEffect, useRef, useState } from 'react';
import { useLocalParticipant } from '@livekit/components-react';

export default function VideoUploadRelay() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const { localParticipant } = useLocalParticipant();

  useEffect(() => {
    if (file && videoRef.current) {
      const videoElement = videoRef.current;
      const stream = videoElement.captureStream();

      const videoTrack = stream.getVideoTracks()[0];
      const audioTrack = stream.getAudioTracks()[0];

      if (videoTrack) localParticipant.publishTrack(videoTrack);
      if (audioTrack) localParticipant.publishTrack(audioTrack);
    }
  }, [file, localParticipant]);

  return (
    <div className="text-white p-4">
      <input
        type="file"
        accept="video/*"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) setFile(f);
        }}
      />
      {file && (
        <video
          ref={videoRef}
          src={URL.createObjectURL(file)}
          autoPlay
          loop
          muted
          controls
          className="w-full mt-3"
        />
      )}
    </div>
  );
}
