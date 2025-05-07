import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LivestreamTypeSelector, { LivestreamType } from '@/components/LivestreamTypeSelector';
import LivestreamDirect from '@/components/LivestreamDirect';
import LivestreamHybrid from '@/components/LivestreamHybrid';
import VideoUploadRelay from '@/components/VideoUploadRelay';

const SellerPage: React.FC = () => {
  const [livestreamType, setLivestreamType] = useState<LivestreamType>('direct');
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  const roomName = 'default-room'; // Tạm thời cố định, có thể cho người bán nhập sau
  const identity = 'seller-' + Math.floor(Math.random() * 10000);
  const role = livestreamType === 'direct' || livestreamType === 'hybrid-audio' ? 'publisher' : 'file';
  const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL || '';

  useEffect(() => {
    const fetchToken = async () => {
      const res = await fetch(
        `/api/token?room=${roomName}&identity=${identity}&role=publisher`
      );
      const data = await res.json();
      setToken(data.token);
    };

    fetchToken();
  }, [livestreamType]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bắt đầu bán hàng livestream</h1>

      <LivestreamTypeSelector selectedType={livestreamType} onSelect={setLivestreamType} />

      <div className="mt-6">
        {token && livestreamType === 'direct' && (
          <LivestreamDirect token={token} serverUrl={serverUrl} />
        )}
        {token && livestreamType === 'hybrid-audio' && (
          <LivestreamHybrid token={token} serverUrl={serverUrl} />
        )}
        {livestreamType === 'full-file' && <VideoUploadRelay />}
      </div>
    </div>
  );
};

export default SellerPage;
