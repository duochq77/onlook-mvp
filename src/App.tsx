// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RoleSelectPage from './components/RoleSelectPage';
import SellerPage from './pages/SellerPage';
import ViewerPage from './pages/ViewerPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelectPage />} />
        <Route path="/seller/:room" element={<SellerPage />} />
        <Route path="/viewer/:room" element={<ViewerPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
