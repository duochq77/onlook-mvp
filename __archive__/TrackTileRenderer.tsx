// File: components/TrackTileRenderer.tsx
import React from 'react';
import {
  Participant,
  Track,
  TrackPublication,
  useTrack,
} from '@livekit/components-react';

interface TrackTileRendererProps {
  trackPublication: TrackPublication;
  participant: Participant;
}

const TrackTileRenderer: React.FC<TrackTileRendererProps> = ({
  trackPublication,
  participant,
}) => {
  const { isSubscribed, track } = useTrack(trackPublication);

  if (!isSubscribed || !track) {
    return null;
  }

  if (track.kind === Track.Kind.Video) {
    return <video ref={(ref) => ref && track.attach(ref)} autoPlay muted style={{ width: '100%' }} />;
  }

  return null;
};

export default TrackTileRenderer;
