import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import Carros from './pages/Carros';
import Contato from './pages/Contato';
import AdminSetup from './pages/AdminSetup';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/carros" element={<Carros />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/admin-setup" element={<AdminSetup />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
