import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600"></div>
      <div className="container py-12 relative z-10">
        <div className="grid grid-3 desktop-grid-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-2 rounded-lg">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold">SZX CARS</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">Concessionária de veículos com qualidade e confiança.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6">Contato</h3>
            <div className="space-y-4 text-gray-300">
              <p>Rua das Flores, 123 - Centro</p>
              <p>(11) 9999-8888</p>
              <p>contato@szxcars.com.br</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6">Horários</h3>
            <div className="space-y-3 text-gray-300 mb-6">
              <p>Seg-Sex: 8h - 18h</p>
              <p>Sábado: 8h - 16h</p>
              <p>Domingo: Fechado</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400 mb-2">2025 SZX CARS. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
