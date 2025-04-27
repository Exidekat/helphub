// frontend/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ScanPage from './pages/ScanPage';
import OverviewPage from './pages/OverviewPage';
import ScanPageDemo from './pages/ScanPageDemo';
import './index.css';

const App: React.FC = () => (
  <BrowserRouter>
    <div className="min-h-screen bg-white text-gray-900">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/scan/:code_id" element={<ScanPage />} />
        <Route path="/overview" element={<OverviewPage />} />
        <Route path="/demo" element={<ScanPageDemo />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
