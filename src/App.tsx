import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SellerPage from './pages/SellerPage';
import ViewerPage from './pages/ViewerPage';

function App() {
  const [sellerToken, setSellerToken] = useState<string | null>(null);
  const [viewerToken, setViewerToken] = useState<string | null>(null);
  const room = 'a';

  // ✅ Sử dụng biến môi trường để linh hoạt khi tách backend
  const apiBase = process.env.NEXT_PUBLIC_API_BASE || '';

  useEffect(() => {
    // ✅ Gọi đúng API cấp token cho seller
    fetch(`${apiBase}/api/token?room=${room}&identity=seller-${room}&role=publisher`)
      .then((res) => res.json())
      .then((data) => {
        console.log('📦 Seller Token:', data.token);
        setSellerToken(data.token);
      })
      .catch((err) => console.error('❌ Lỗi lấy token seller:', err));

    // ✅ Gọi đúng API cấp token cho viewer
    fetch(`${apiBase}/api/token?room=${room}&identity=viewer-${room}&role=viewer`)
      .then((res) => res.json())
      .then((data) => {
        console.log('📦 Viewer Token:', data.token);
        setViewerToken(data.token);
      })
      .catch((err) => console.error('❌ Lỗi lấy token viewer:', err));
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
              <p>🔄 Đang lấy token người bán...</p>
            )
          }
        />
        <Route
          path="/viewer"
          element={
            viewerToken ? (
              <ViewerPage token={viewerToken} room={room} />
            ) : (
              <p>🔄 Đang lấy token người xem...</p>
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
