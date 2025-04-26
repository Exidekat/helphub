// frontend/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ScanPage from './pages/ScanPage';
import OverviewPage from './pages/OverviewPage';

const App: React.FC = () => (
  <BrowserRouter>
    <div className="min-h-screen bg-primary text-text">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/scan/:code_id" element={<ScanPage />} />
        <Route path="/overview" element={<OverviewPage />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
