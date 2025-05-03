import React from 'react';
import { ParticipantTile, TrackReferenceOrPlaceholder } from '@livekit/components-react';

interface Props {
  trackRef: TrackReferenceOrPlaceholder;
}

export const TrackTileRenderer = ({ trackRef }: Props) => {
  return <ParticipantTile trackRef={trackRef} />;
};
