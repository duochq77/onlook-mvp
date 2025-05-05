// File: components/RoleSelectPage.tsx
import React from 'react';
import { useRouter } from 'next/router';

const RoleSelectPage: React.FC = () => {
  const router = useRouter();

  const handleSelect = (role: 'seller' | 'viewer') => {
    router.push(`/${role === 'seller' ? 'SellerPage' : 'ViewerPage'}`);
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Chào mừng đến với Onlook</h1>
      <p>Chọn vai trò để bắt đầu:</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
        <button onClick={() => handleSelect('viewer')}>Người xem</button>
        <button onClick={() => handleSelect('seller')}>Người bán</button>
      </div>
    </div>
  );
};

export default RoleSelectPage;
