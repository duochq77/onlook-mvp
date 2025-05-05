// File: pages/index.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Chào mừng đến với Onlook</h1>
      <p>Chọn vai trò để bắt đầu:</p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link href="/ViewerPage">
          <button>Xem Livestream (Người xem)</button>
        </Link>
        <Link href="/SellerPage">
          <button>Phát Livestream (Người bán)</button>
        </Link>
      </div>
    </div>
  );
}
