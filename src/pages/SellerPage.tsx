// src/pages/SellerPage.tsx

import React from 'react';

const SellerPage: React.FC = () => {
  const startLivestream = async () => {
    const res = await fetch('/api/startLivestream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        room: 'a',           // có thể dùng tên khác
        identity: 'seller-a' // định danh người bán
      }),
    });

    const data = await res.json();
    console.log('Start Livestream Response:', data);
    alert('🟢 Đã bắt đầu livestream!');
  };

  const endLivestream = async () => {
    const res = await fetch('/api/endLivestream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ room: 'a' }),
    });

    const data = await res.json();
    console.log('End Livestream Response:', data);
    alert('🔴 Đã kết thúc livestream!');
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Trang người bán – Livestream</h1>
      <button
        onClick={startLivestream}
        style={{ marginRight: 10, padding: '10px 20px' }}
      >
        ▶️ Bắt đầu Livestream
      </button>
      <button
        onClick={endLivestream}
        style={{ padding: '10px 20px' }}
      >
        ⏹️ Kết thúc Livestream
      </button>
    </div>
  );
};

export default SellerPage;
