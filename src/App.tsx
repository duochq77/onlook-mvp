import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SellerPage from './pages/SellerPage';
import ViewerPage from './pages/ViewerPage';

function App() {
  const [sellerToken, setSellerToken] = useState<string | null>(null);
  const [viewerToken, setViewerToken] = useState<string | null>(null);
  const room = 'a'; // phòng cố định (có thể thay bằng seller_{id} sau)

  const apiBase = ''; // vì đang chạy trên web thật

  useEffect(() => {
    // Gọi token cho seller
    fetch(`${apiBase}/api/token?room=${room}&identity=seller-${room}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('📦 Seller Token:', data.token);
        setSellerToken(data.token);
      })
      .catch((err) => console.error('❌ Lỗi lấy token seller:', err));

    // Gọi token cho viewer
    fetch(`${apiBase}/api/token?room=${room}&identity=viewer-${room}`)
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
