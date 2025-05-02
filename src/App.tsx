import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SellerPage from './pages/SellerPage';
import ViewerPage from './pages/ViewerPage';

function App() {
  const [sellerToken, setSellerToken] = useState<string | null>(null);
  const [viewerToken, setViewerToken] = useState<string | null>(null);
  const room = 'a';
  const apiBase = '';

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
            <>
              <h1>🧪 Seller route đang hoạt động</h1>
              <p>📦 Token: {sellerToken || 'Đang lấy...'}</p>
            </>
          }
        />
        <Route
          path="/viewer"
          element={
            <>
              <h1>🧪 Viewer route đang hoạt động</h1>
              <p>📦 Token: {viewerToken || 'Đang lấy...'}</p>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
