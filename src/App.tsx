import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SellerPage from './pages/SellerPage';
import ViewerPage from './pages/ViewerPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/seller/:room" element={<SellerPage />} />
        <Route path="/viewer/:room" element={<ViewerPage />} />
      </Routes>
    </Router>
  );
};

export default App;
