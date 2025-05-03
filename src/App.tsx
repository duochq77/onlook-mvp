import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SellerPage from './pages/SellerPage';
import ViewerPage from './pages/ViewerPage';
import { getToken } from './services/api'; // 🔗 gọi API token từ file riêng

const room = 'a';

function App() {
  const [sellerToken, setSellerToken] = useState<string | null>(null);
  const [viewerToken, setViewerToken] = useState<string | null>(null);

  useEffect(() => {
    getToken({ room, identity: `seller-${room}`, role: 'publisher' }).then(setSellerToken);
    getToken({ room, identity: `viewer-${room}`, role: 'subscriber' }).then(setViewerToken);
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
