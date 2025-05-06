// src/main.tsx
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App'; // Nhớ import đúng đường dẫn
import SellerPage from '../pages/SellerPage';

// Giả sử pageProps có thể là một object, ví dụ như:
const pageProps = {
  content: 'Some content for the page'
};

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App pageProps={pageProps} />} />
      <Route path="/seller" element={<SellerPage />} />
    </Routes>
  </BrowserRouter>
);
