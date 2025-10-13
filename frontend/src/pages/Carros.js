import React, { useState, useEffect } from 'react';

const Carros = () => {
  const [carros, setCarros] = useState([]);
  const [filtroMarca, setFiltroMarca] = useState('');
  const [loading, setLoading] = useState(true);
  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    carregarCarros();
  }, [filtroMarca]); // eslint-disable-line react-hooks/exhaustive-deps

  const carregarCarros = () => {
    setLoading(true);
    const url = filtroMarca ? `/api/carros?marca=${filtroMarca}` : '/api/carros';
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setCarros(data);
        
        // Extrair marcas únicas para o filtro
        const marcasUnicas = [...new Set(data.map(carro => carro.marca))];
        setMarcas(marcasUnicas);
        
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar carros:', error);
        setLoading(false);
      });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header da Página */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Nosso Catálogo</h1>
          <p className="text-xl text-gray-600">
            Encontre o carro perfeito para você
          </p>
        </div>

        {/* Filtros */}
        <div className="mb-8 flex flex-wrap gap-4 justify-center">
          <select 
            value={filtroMarca} 
            onChange={(e) => setFiltroMarca(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todas as Marcas</option>
            {marcas.map(marca => (
              <option key={marca} value={marca}>{marca}</option>
            ))}
          </select>
          
          {filtroMarca && (
            <button 
              onClick={() => setFiltroMarca('')}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Limpar Filtro
            </button>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando carros...</p>
          </div>
        )}

        {/* Grade de Carros */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {carros.length > 0 ? carros.map((carro, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Imagem do Carro */}
                <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center relative overflow-hidden">
                  {carro.fotos && carro.fotos.length > 0 ? (
                    <img 
                      src={`/uploads/${carro.fotos[0]}`} 
                      alt={`${carro.marca} ${carro.modelo}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <svg className="w-16 h-16 text-gray-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
                      </svg>
                      <p className="text-gray-400 text-sm mt-2">Sem foto</p>
                    </div>
                  )}
                  
                  {/* Badge do Ano */}
                  <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-sm font-semibold">
                    {carro.ano}
                  </div>
                </div>

                {/* Informações do Carro */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{carro.marca}</h3>
                    <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {carro.cor}
                    </span>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-gray-700 mb-3">{carro.modelo}</h4>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                      </svg>
                      Ano: {carro.ano}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                      </svg>
                      KM: {carro.km?.toLocaleString('pt-BR') || 'N/A'}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                      </svg>
                      Cor: {carro.cor}
                    </div>
                  </div>

                  {/* Descrição */}
                  {carro.descricao && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {carro.descricao}
                    </p>
                  )}

                  {/* Preço */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">
                        {formatPrice(carro.preco)}
                      </p>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                      Tenho Interesse
                    </button>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center py-8">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                </svg>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  {filtroMarca ? `Nenhum carro da marca ${filtroMarca} encontrado` : 'Nenhum carro disponível no momento'}
                </h3>
                <p className="text-gray-500">
                  {filtroMarca ? 'Tente selecionar uma marca diferente.' : 'Novos veículos serão adicionados em breve.'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Call to Action */}
        {!loading && carros.length > 0 && (
          <div className="text-center mt-12 py-8 bg-gray-50 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Não encontrou o que procura?
            </h3>
            <p className="text-gray-600 mb-6">
              Entre em contato conosco! Temos uma ampla rede de fornecedores e podemos encontrar o carro ideal para você.
            </p>
            <a 
              href="/contato" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
            >
              Falar com um Consultor
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carros;