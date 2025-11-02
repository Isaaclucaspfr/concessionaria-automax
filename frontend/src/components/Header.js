import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  const handleLinkClick = (path) => {
    console.log('🔗 CLICK NO LINK:', path);
    console.log('📍 Location atual:', location.pathname);
    console.log('🎯 Navegando para:', path);
  };
  
  console.log('🧭 HEADER RENDERIZANDO - Location:', location.pathname);
  
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b-4 border-gradient">{console.log('🎨 Header JSX sendo renderizado')}
      <div className="container">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white p-2 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
              </svg>
            </div>
            <div className="header-logo">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">SZX CARS</h1>
              <p className="text-xs text-gray-500 font-semibold">Concessionária Premium</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link 
              to="/" 
              onClick={() => handleLinkClick('/')}
              className={`hidden md:block transition-colors ${isActive('/') ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Início
            </Link>
            <Link 
              to="/carros" 
              onClick={() => handleLinkClick('/carros')}
              className={`hidden md:block transition-colors ${isActive('/carros') ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Catálogo
            </Link>
            <Link 
              to="/contato" 
              onClick={() => handleLinkClick('/contato')}
              className={`hidden md:block transition-colors ${isActive('/contato') ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Contato
            </Link>
            <Link 
              to="/login" 
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all"
              title="Área Administrativa"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="font-semibold">Login</span>
            </Link>
          </nav>


        </div>
      </div>
    </header>
  );
};

export default Header;