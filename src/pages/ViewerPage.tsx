import React, { useEffect, useState } from 'react';
import { LiveKitRoom } from '@livekit/components-react';
import VideoUploadRelay from '../components/VideoUploadRelay';
import LivestreamDirect from '../components/LivestreamDirect';
import LivestreamTypeSelector from '../components/LivestreamTypeSelector';
import { useGPSUpdater } from '../utils/useGPSUpdater';
import { getCurrentUser } from '../utils/authUtils';

export default function SellerPage() {
  useGPSUpdater();
  const [token, setToken] = useState('');
  const [sellerId, setSellerId] = useState('');
  const [roomName, setRoomName] = useState('');
  const [streamType, setStreamType] = useState<'live' | 'file'>('live');

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user) {
        setSellerId(user.id);
        setRoomName(`seller_${user.id}`);
      }
    });
  }, []);

  const fetchToken = async () => {
    const res = await fetch(`/api/seller-token?room=${roomName}&identity=${sellerId}`);
    const data = await res.json();
    setToken(data.token);
  };

  return (
    <div className="overflow-hidden h-screen w-screen relative bg-black text-white">
      <button
        onClick={fetchToken}
        className="absolute top-4 left-4 z-20 bg-green-500 text-white px-4 py-2 rounded"
      >
        Bắt đầu phiên
      </button>

      {token && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10">
          <LiveKitRoom token={token} serverUrl={process.env.LIVEKIT_URL} connect={true}>
            <LivestreamTypeSelector onChange={setStreamType} />
            {streamType === 'file' ? <VideoUploadRelay /> : <LivestreamDirect />}
          </LiveKitRoom>
        </div>
      )}
    </div>
  );
}
