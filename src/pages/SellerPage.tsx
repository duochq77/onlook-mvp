// src/pages/SellerPage.tsx

import React from 'react';

const SellerPage: React.FC = () => {
  const startLivestream = async () => {
    try {
      const res = await fetch('/api/startLivestream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room: 'a',
          identity: 'seller-a',
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Lỗi ${res.status}: ${errText}`);
      }

      const data = await res.json();
      console.log('Start Livestream Response:', data);
      alert('🟢 Đã bắt đầu livestream!');
    } catch (error) {
      console.error('❌ Lỗi khi bắt đầu livestream:', error);
      alert('❌ Không thể bắt đầu livestream: ' + error);
    }
  };

  const endLivestream = async () => {
    try {
      const res = await fetch('/api/endLivestream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ room: 'a' }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Lỗi ${res.status}: ${errText}`);
      }

      const data = await res.json();
      console.log('End Livestream Response:', data);
      alert('🔴 Đã kết thúc livestream!');
    } catch (error) {
      console.error('❌ Lỗi khi kết thúc livestream:', error);
      alert('❌ Không thể kết thúc livestream: ' + error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Trang người bán – Livestream</h1>
      <button onClick={startLivestream} style={{ marginRight: 10, padding: '10px 20px' }}>
        ▶️ Bắt đầu Livestream
      </button>
      <button onClick={endLivestream} style={{ padding: '10px 20px' }}>
        ⏹️ Kết thúc Livestream
      </button>
    </div>
  );
};

export default SellerPage;
