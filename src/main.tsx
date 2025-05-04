// src/main.tsx

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import SellerPage from './pages/SellerPage';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/seller" element={<SellerPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
