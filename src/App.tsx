import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SellerPage } from './pages/SellerPage'
import { ViewerPage } from './pages/ViewerPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/seller" element={<SellerPage />} />
        <Route path="/viewer" element={<ViewerPage />} />
        <Route path="*" element={<div>Chọn /seller hoặc /viewer trên URL</div>} />
      </Routes>
    </Router>
  )
}

export default App
