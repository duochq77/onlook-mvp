import { useNavigate } from 'react-router-dom';

export default function RoleSelectPage() {
  const navigate = useNavigate();

  const handleSelectRole = (role: 'seller' | 'viewer') => {
    navigate(`/${role}`);
  };

  return (
    <div>
      <h2>Chọn vai trò:</h2>
      <button onClick={() => handleSelectRole('seller')}>Người Bán</button>
      <button onClick={() => handleSelectRole('viewer')}>Người Xem</button>
    </div>
  );
}
