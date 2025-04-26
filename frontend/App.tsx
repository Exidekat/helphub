// frontend/App.tsx
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ScanPage from './pages/ScanPage'

const App: React.FC = () => (
  <BrowserRouter basename={import.meta.env.BASE_URL || '/'}>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/scan/:code_id" element={<ScanPage />} />
    </Routes>
  </BrowserRouter>
)

export default App