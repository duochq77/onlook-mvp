import { useEffect } from 'react';
import { useLocalParticipant, useMediaDevice } from '@livekit/components-react';

export default function LivestreamDirect() {
  const { localParticipant } = useLocalParticipant();
  const { getDefaultDevice } = useMediaDevice();

  useEffect(() => {
    async function startPublishing() {
      const cam = await getDefaultDevice('videoinput');
      const mic = await getDefaultDevice('audioinput');
      if (cam) await localParticipant.setCameraEnabled(true);
      if (mic) await localParticipant.setMicrophoneEnabled(true);
    }

    startPublishing();
  }, [localParticipant, getDefaultDevice]);

  return <div className="text-white p-2">Đang phát trực tiếp bằng webcam...</div>;
}
