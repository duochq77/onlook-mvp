import React, { useEffect, useRef, useState } from 'react';
import { Room, createLocalVideoTrack, connect, LocalTrack } from 'livekit-client';

interface Props {
    token: string;
    serverUrl: string;
}

const LivestreamHybrid: React.FC<Props> = ({ token, serverUrl }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [room, setRoom] = useState<Room | null>(null);
    const [audioFile, setAudioFile] = useState<File | null>(null);

    useEffect(() => {
        const startLivestream = async () => {
            const newRoom = await connect(serverUrl, token);
            setRoom(newRoom);

            // Lấy video trực tiếp từ webcam
            const videoTrack = await createLocalVideoTrack();
            newRoom.localParticipant.publishTrack(videoTrack);

            if (videoRef.current) {
                const mediaStream = new MediaStream([videoTrack.mediaStreamTrack]);
                videoRef.current.srcObject = mediaStream;
                videoRef.current.play();
            }
        };

        startLivestream();

        return () => {
            room?.disconnect();
        };
    }, [token, serverUrl]);

    // Phát âm thanh từ file
    useEffect(() => {
        if (!audioFile || !room) return;

        const playAudioFromFile = async () => {
            const audioURL = URL.createObjectURL(audioFile);
            const audioElement = new Audio(audioURL);
            audioElement.loop = true;

            const audioCtx = new AudioContext();
            const source = audioCtx.createMediaElementSource(audioElement);
            const destination = audioCtx.createMediaStreamDestination();

            source.connect(destination);
            source.connect(audioCtx.destination); // Cho phép nghe tại local
            audioElement.play();

            const audioTrack = destination.stream.getAudioTracks()[0];
            if (audioTrack) {
                room.localParticipant.publishTrack(audioTrack as MediaStreamTrack);
            }
        };

        playAudioFromFile();
    }, [audioFile, room]);

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Đang livestream: video từ webcam + âm thanh từ file</h2>
            <video ref={videoRef} autoPlay muted playsInline className="w-full max-w-md rounded-xl border" />
            <div className="mt-4">
                <label className="block mb-2 font-medium">Chọn file âm thanh (MP3/WAV):</label>
                <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => {
                        if (e.target.files?.[0]) setAudioFile(e.target.files[0]);
                    }}
                    className="border rounded p-2"
                />
            </div>
        </div>
    );
};

export default LivestreamHybrid;
