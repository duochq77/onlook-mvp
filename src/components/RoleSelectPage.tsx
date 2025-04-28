// src/components/RoleSelectPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelectPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Chào mừng tới Onlook</h2>
      <p>Hãy chọn vai trò:</p>
      <div style={{ marginTop: '20px' }}>
        <button
          style={{ margin: '10px', padding: '10px 20px' }}
          onClick={() => navigate('/viewer')}
        >
          Xem livestream
        </button>
        <button
          style={{ margin: '10px', padding: '10px 20px' }}
          onClick={() => navigate('/seller')}
        >
          Bán hàng
        </button>
      </div>
    </div>
  );
};

export default RoleSelectPage;
