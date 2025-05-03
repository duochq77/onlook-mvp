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
    { source: Track.Source.Camera },
    { source: Track.Source.Microphone },
  ]);

  useEffect(() => {
    console.log('Đang xem livestream...');
  }, []);

  return (
    <LiveKitRoom
      token={token ?? ''}
      serverUrl={serverUrl}
      connect={true}
      video={false} // viewer không phát video
      audio={false} // viewer không phát mic
    >
      <div className="viewer-container">
        {trackRefs.map((trackRef: TrackReference) => {
          const track = trackRef.publication?.track;

          if (track && !track.isLocal) {
            if (track.kind === 'video') {
              return (
                <VideoTrack
                  key={trackRef.publication.trackSid}
                  trackRef={trackRef}
                />
              );
            } else if (track.kind === 'audio') {
              useEffect(() => {
                const audioEl = track.attach();
                audioEl.autoplay = true;
                audioEl.controls = false;
                audioEl.style.display = 'none';
                document.body.appendChild(audioEl);

                return () => {
                  track.detach().forEach((el) => el.remove());
                };
              }, [track]);
            }
          }

          return null;
        })}
      </div>
    </LiveKitRoom>
  );
};

export default ViewerPage;
