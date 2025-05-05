// File: components/LivestreamDirect.tsx
import React from 'react';
import {
  LiveKitRoom,
  VideoConference,
} from '@livekit/components-react';

interface LivestreamDirectProps {
  token: string;
  serverUrl: string;
}

const LivestreamDirect: React.FC<LivestreamDirectProps> = ({ token, serverUrl }) => {
  return (
    <LiveKitRoom
      token={token}
      serverUrl={serverUrl}
      connect
      video
      audio
    >
      <VideoConference />
    </LiveKitRoom>
  );
};

export default LivestreamDirect;
