import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SellerPage from './pages/SellerPage';
import ViewerPage from './pages/ViewerPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/seller" element={<SellerPage />} />
        <Route path="/viewer" element={<ViewerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
