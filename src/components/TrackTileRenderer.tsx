import React from 'react';
import { TrackReferenceOrPlaceholder, ParticipantTile } from '@livekit/components-react';

interface Props {
  trackRef: TrackReferenceOrPlaceholder;
}

const TrackTileRenderer: React.FC<Props> = ({ trackRef }) => {
  return <ParticipantTile trackRef={trackRef} />;
};

export default TrackTileRenderer;
