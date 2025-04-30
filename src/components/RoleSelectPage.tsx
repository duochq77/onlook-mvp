import { Link } from 'react-router-dom';

export default function RoleSelectPage() {
  return (
    <div>
      <h2>Chọn vai trò</h2>
      <Link to="/seller">Người bán</Link>
      <br />
      <Link to="/viewer">Người xem</Link>
    </div>
  );
}
