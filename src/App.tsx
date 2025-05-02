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
    const sellerParams = new URLSearchParams({
      room,
      identity: `seller-${room}`,
      role: 'publisher',
    });

    const viewerParams = new URLSearchParams({
      room,
      identity: `viewer-${room}`,
      role: 'viewer',
    });

    // Gọi token seller
    fetch(`${apiBase}/api/token?${sellerParams.toString()}`)
      .then(async (res) => {
        const text = await res.text();
        console.log('📦 Seller raw response:', text);
        try {
          const json = JSON.parse(text);
          setSellerToken(json.token);
        } catch (e) {
          console.error('❌ Lỗi parse token seller:', e);
        }
      })
      .catch((err) => console.error('❌ Lỗi gọi API seller:', err));

    // Gọi token viewer
    fetch(`${apiBase}/api/token?${viewerParams.toString()}`)
      .then(async (res) => {
        const text = await res.text();
        console.log('📦 Viewer raw response:', text);
        try {
          const json = JSON.parse(text);
          setViewerToken(json.token);
        } catch (e) {
          console.error('❌ Lỗi parse token viewer:', e);
        }
      })
      .catch((err) => console.error('❌ Lỗi gọi API viewer:', err));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/viewer" />} />
        <Route
          path="/seller"
