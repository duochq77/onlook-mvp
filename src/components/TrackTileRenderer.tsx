import React from 'react';
import { TrackReferenceOrPlaceholder, VideoTrack } from '@livekit/components-react';

interface Props {
  trackRef: TrackReferenceOrPlaceholder;
}

const TrackTileRenderer: React.FC<Props> = ({ trackRef }) => {
  return (
    <div className="rounded-xl overflow-hidden shadow-md">
      <VideoTrack
        trackRef={trackRef}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default TrackTileRenderer;
