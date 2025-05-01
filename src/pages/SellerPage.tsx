import React, { useEffect, useState } from 'react';
import { LiveKitRoom, ParticipantTile } from '@livekit/components-react';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import { getCurrentUser } from '../utils/authUtils';

export default function ViewerPage() {
  const [token, setToken] = useState('');
  const [buyerId, setBuyerId] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [currentRoom, setCurrentRoom] = useState(''); // phòng đang xem
  const [availableRooms, setAvailableRooms] = useState<string[]>([]); // danh sách các phòng seller

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user) {
        setBuyerId(user.id);
        loadRooms(); // giả lập danh sách phòng
      }
    });
  }, []);

  const loadRooms = () => {
    // Giả lập danh sách các seller đang phát (tên room)
    setAvailableRooms(['seller_abc123', 'seller_xyz456', 'seller_demo789']);
  };

  const joinRoom = async (roomName: string) => {
    const res = await fetch(`/api/viewer-token?room=${roomName}&identity=${buyerId}`);
    const data = await res.json();
    setToken(data.token);
    setCurrentRoom(roomName);
  };

  return (
    <div className="overflow-hidden h-screen w-screen relative bg-black text-white">
      <div className="absolute top-2 left-2 z-20">
        <h2 className="text-lg font-bold mb-2">Phòng đang phát:</h2>
        {availableRooms.map((room) => (
          <button
            key={room}
            onClick={() => joinRoom(room)}
            className="mr-2 mb-2 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
          >
            {room}
          </button>
        ))}
      </div>

      {token && (
        <>
          <div className="fixed top-0 left-0 w-screen h-screen z-10">
            <LiveKitRoom token={token} serverUrl={process.env.LIVEKIT_URL} connect={true}>
              <ParticipantTile />
            </LiveKitRoom>
          </div>

          <div className="absolute bottom-0 left-0 z-20 w-full bg-white/90 text-black p-4 max-h-1/2 overflow-y-auto">
            <ProductList livestreamId={currentRoom} onSelect={setSelectedProduct} />
            <Cart livestreamId={currentRoom} buyerId={buyerId} selectedProduct={selectedProduct} />
          </div>
        </>
      )}
    </div>
  );
}
