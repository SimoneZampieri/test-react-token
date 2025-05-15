

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Rotta per la pagina di login */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Reindirizzamento della rotta principale alla pagina di login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App