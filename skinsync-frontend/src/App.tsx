import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SkinAnalysis from './pages/SkinAnalysis';
import Recommendations from './pages/Recommendations';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analysis" element={<SkinAnalysis />} />
          <Route path="/recommendations" element={<Recommendations />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;