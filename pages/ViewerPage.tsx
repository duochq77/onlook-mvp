// File: pages/ViewerPage.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { LiveKitRoom, VideoTrack } from '@livekit/components-react';
import '@livekit/components-styles';

export default function ViewerPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const room = urlParams.get('room') || 'onlook';
      const identity = urlParams.get('identity') || `viewer-${Math.floor(Math.random() * 10000)}`;
      const role = 'subscriber';

      const res = await fetch(`/api/token?room=${room}&identity=${identity}&role=${role}`);
      const data = await res.json();
      setToken(data.token);
    };
    fetchToken();
  }, []);

  if (!token) {
    return <div>Đang tải...</div>;
  }

  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      connect={true}
      video={true}
      audio={true}
    >
      <VideoTrack participant={undefined} />
    </LiveKitRoom>
  );
}
