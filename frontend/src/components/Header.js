import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">AutoMax</h1>
              <p className="text-xs text-gray-500">Concessionária</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`transition-colors ${isActive('/') ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Início
            </Link>
            <Link 
              to="/carros" 
              className={`transition-colors ${isActive('/carros') ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Catálogo
            </Link>
            <Link 
              to="/contato" 
              className={`transition-colors ${isActive('/contato') ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Contato
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;