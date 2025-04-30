import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SellerPage from './pages/SellerPage';
import ViewerPage from './pages/ViewerPage';

function App() {
  const [sellerToken, setSellerToken] = useState<string | null>(null);
  const [viewerToken, setViewerToken] = useState<string | null>(null);
  const room = 'a';

  useEffect(() => {
    fetch(`/api/seller-token?room=${room}`)
      .then((res) => res.json())
      .then((data) => setSellerToken(data.token))
      .catch((err) => console.error('Lỗi seller-token:', err));

    fetch(`/api/viewer-token?room=${room}`)
      .then((res) => res.json())
      .then((data) => setViewerToken(data.token))
      .catch((err) => console.error('Lỗi viewer-token:', err));
  }, []);

  return (
    <Router>
      <Routes>
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
              <ViewerPage token={viewerToken} room={room} />
            ) : (
              <p>Đang kết nối tới phòng livestream...</p>
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
