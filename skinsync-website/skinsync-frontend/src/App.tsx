import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import UserProfile from './components/features/UserProfile';
import ProductRecommender from './components/features/ProductRecommender';
import IngredientAnalyzer from './components/features/IngredientAnalyzer';
import SkinAnalysisForm from './components/SkinAnalysisForm';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Green shade for natural/organic feel
    },
    secondary: {
      main: '#78909C', // Cool gray for professional look
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<SkinAnalysisForm />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/recommendations" element={<ProductRecommender />} />
              <Route path="/analyze" element={<IngredientAnalyzer ingredients={[]} skinType="" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
