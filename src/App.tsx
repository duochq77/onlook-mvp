import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SellerPage from './pages/SellerPage';
import ViewerPage from './pages/ViewerPage';

function App() {
  const [sellerToken, setSellerToken] = useState<string | null>(null);
  const [viewerToken, setViewerToken] = useState<string | null>(null);
  const room = 'a';

  // ✅ URL token server từ Render.com
  const apiBase = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    // 🔐 Lấy token cho người bán
    fetch(`${apiBase}/api/seller-token?room=${room}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Seller Token:', data.token);
        setSellerToken(data.token);
      })
      .catch((err) => console.error('Lỗi seller-token:', err));

    // 👀 Lấy token cho người xem
    fetch(`${apiBase}/api/viewer-token?room=${room}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Viewer Token:', data.token);
        setViewerToken(data.token);
      })
      .catch((err) => console.error('Lỗi viewer-token:', err));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/viewer" />} />
        <Route
          path="/seller"
          element={
            sellerToken ? (
              <SellerPage token={sellerToken} room={room} />
            ) : (
              <p>Đang kết nối tới phòng livestream...</p>
            )
          }
        />
        <Route
          path="/viewer"
          element={
            viewerToken ? (
              <ViewerPage token={viewerToken}
