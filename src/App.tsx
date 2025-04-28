// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RoleSelectPage from './components/RoleSelectPage';
import SellerPage from './components/SellerPage';
import ViewerPage from './components/ViewerPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoleSelectPage />} />
        <Route path="/seller" element={<SellerPage />} />
        <Route path="/viewer" element={<ViewerPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
