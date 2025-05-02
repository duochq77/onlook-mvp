import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SellerPage from './pages/SellerPage';
import ViewerPage from './pages/ViewerPage';

function App() {
  const [sellerToken, setSellerToken] = useState<string | null>(null);
  const [viewerToken, setViewerToken] = useState<string | null>(null);
  const room = 'a';
  const apiBase = 'https://onlook-token-server.onrender.com';

  useEffect(() => {
    fetch(`${apiBase}/api/token?room=${room}&identity=seller-${room}&role=publisher`)
      .then((res) => res.json())
      .then((data) => setSellerToken(data.token))
      .catch((err) => console.error('❌ Lỗi lấy token seller:', err));

    fetch(`${apiBase}/api/token?room=${room}&identity=viewer-${room}&role=viewer`)
      .then((res) => res.json())
      .then((data) => setViewerToken(data.token))
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
