import React, { useEffect, useRef, useState } from 'react';
import { Room, RemoteTrackPublication, connect } from 'livekit-client';

const ViewerPage: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [room, setRoom] = useState<Room | null>(null);

    const roomName = 'default-room';
    const identity = 'viewer-' + Math.floor(Math.random() * 10000);
    const role = 'subscriber';
    const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL || '';

    useEffect(() => {
        const startViewing = async () => {
            const res = await fetch(
                `/api/token?room=${roomName}&identity=${identity}&role=${role}`
            );
            const data = await res.json();
            const newRoom = await connect(serverUrl, data.token);

            setRoom(newRoom);

            newRoom.on('trackSubscribed', (track, publication, participant) => {
                if (track.kind === 'video' && videoRef.current) {
                    track.attach(videoRef.current);
                } else if (track.kind === 'audio' && audioRef.current) {
                    track.attach(audioRef.current);
                    audioRef.current.play().catch((err) => {
                        console.warn('Audio autoplay blocked:', err);
                    });
                }
            });

            newRoom.on('trackUnsubscribed', (track) => {
                track.detach();
            });
        };

        startViewing();

        return () => {
            room?.disconnect();
        };
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Giao diện người xem</h1>
            <video ref={videoRef} autoPlay playsInline className="w-full max-w-xl border rounded-xl mb-4" />
            <audio ref={audioRef} autoPlay />
        </div>
    );
};

export default ViewerPage;
