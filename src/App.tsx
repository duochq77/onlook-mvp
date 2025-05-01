import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SellerPage from './pages/SellerPage';
import ViewerPage from './pages/ViewerPage';

function App() {
  const [sellerToken, setSellerToken] = useState<string | null>(null);
  const [viewerToken, setViewerToken] = useState<string | null>(null);
  const room = 'a'; // bạn có thể thay thành seller_{userId} sau này

  const apiBase = ''; // với Webpack dùng local luôn

  useEffect(() => {
    fetch(`${apiBase}/api/seller-token?room=${room}&identity=seller-a`)
      .then((res) => res.json())
      .then((data) => {
        console.log('📦 Seller Token:', data.token);
        setSellerToken(data.token);
      })
      .catch((err) => console.error('❌ Lỗi seller-token:', err));

    fetch(`${apiBase}/api/viewer-token?room=${room}&identity=viewer-a`)
      .then((res) => res.json())
      .then((data) => {
        console.log('📦 Viewer Token:', data.token);
        setViewerToken(data.token);
      })
      .catch((err) => console.error('❌ Lỗi viewer-token:', err));
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
