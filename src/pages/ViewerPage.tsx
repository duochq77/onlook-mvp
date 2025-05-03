import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  LiveKitRoom,
  VideoTrack,
  useTracks,
  TrackReference,
} from '@livekit/components-react';
import { Track } from 'livekit-client';

const ViewerPage: React.FC = () => {
  const { room } = useParams();

  const serverUrl = process.env.LIVEKIT_URL!;
  const token = sessionStorage.getItem('viewer_token');

  const trackRefs = useTracks([
    { source: Track.Source.Camera, withPlaceholder: true },
    { source: Track.Source.Microphone, withPlaceholder: false },
  ]);

  useEffect(() => {
    console.log('Đang xem livestream...');
  }, []);

  return (
    <LiveKitRoom
      token={token ?? ''}
      serverUrl={serverUrl}
      roomOptions={{ videoCaptureDefaults: { resolution: { width: 1280, height: 720 } } }}
      connect={true}
    >
      <div className="viewer-container">
        {trackRefs.map((trackRef: TrackReference) => {
          if (trackRef.publication?.track && !trackRef.publication.track.isLocal) {
            return (
              <VideoTrack
                key={trackRef.publication.trackSid}
                trackRef={trackRef}
                isLocal={false}
              />
            );
          }
          return null;
        })}
      </div>
    </LiveKitRoom>
  );
};

export default ViewerPage;
