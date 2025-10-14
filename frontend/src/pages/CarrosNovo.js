import React, { useState, useEffect } from 'react';

const Carros = () => {
  const [carros, setCarros] = useState([]);
  const [carrosFiltrados, setCarrosFiltrados] = useState([]);
  const [filtroMarca, setFiltroMarca] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroPreco, setFiltroPreco] = useState('');
  const [loading, setLoading] = useState(true);
  const [marcas, setMarcas] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    carregarCarros();
  }, []);

  useEffect(() => {
    aplicarFiltros();
  }, [carros, filtroMarca, filtroCategoria, filtroPreco]);

  const carregarCarros = () => {
    setLoading(true);
    
    fetch('/api/carros')
      .then(response => response.json())
      .then(data => {
        setCarros(data);
        
        // Extrair marcas e categorias únicas
        const marcasUnicas = [...new Set(data.map(carro => carro.marca))].sort();
        const categoriasUnicas = [...new Set(data.map(carro => carro.categoria))].sort();
        
        setMarcas(marcasUnicas);
        setCategorias(categoriasUnicas);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar carros:', error);
        setLoading(false);
      });
  };

  const aplicarFiltros = () => {
    let resultado = [...carros];

    if (filtroMarca) {
      resultado = resultado.filter(carro => carro.marca === filtroMarca);
    }

    if (filtroCategoria) {
      resultado = resultado.filter(carro => carro.categoria === filtroCategoria);
    }

    if (filtroPreco) {
      switch (filtroPreco) {
        case 'ate-50k':
          resultado = resultado.filter(carro => carro.preco <= 50000);
          break;
        case '50k-100k':
          resultado = resultado.filter(carro => carro.preco > 50000 && carro.preco <= 100000);
          break;
        case '100k-200k':
          resultado = resultado.filter(carro => carro.preco > 100000 && carro.preco <= 200000);
          break;
        case 'acima-200k':
          resultado = resultado.filter(carro => carro.preco > 200000);
          break;
        default:
          break;
      }
    }

    setCarrosFiltrados(resultado);
  };

  const limparFiltros = () => {
    setFiltroMarca('');
    setFiltroCategoria('');
    setFiltroPreco('');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header da Página */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Nosso Catálogo
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore nossa seleção premium de veículos. Qualidade, procedência e as melhores condições de pagamento.
            </p>
            <div className="flex justify-center items-center mt-6 text-sm text-gray-500">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                {carros.length} veículos disponíveis
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Filtros */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <select 
                value={filtroMarca} 
                onChange={(e) => setFiltroMarca(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Todas as Marcas</option>
                {marcas.map(marca => (
                  <option key={marca} value={marca}>{marca}</option>
                ))}
              </select>

              <select 
                value={filtroCategoria} 
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Todas as Categorias</option>
                {categorias.map(categoria => (
                  <option key={categoria} value={categoria}>
                    {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                  </option>
                ))}
              </select>

              <select 
                value={filtroPreco} 
                onChange={(e) => setFiltroPreco(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Todas as Faixas de Preço</option>
                <option value="ate-50k">Até R$ 50.000</option>
                <option value="50k-100k">R$ 50.000 - R$ 100.000</option>
                <option value="100k-200k">R$ 100.000 - R$ 200.000</option>
                <option value="acima-200k">Acima de R$ 200.000</option>
              </select>
            </div>
            
            {(filtroMarca || filtroCategoria || filtroPreco) && (
              <button 
                onClick={limparFiltros}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Limpar Filtros
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 py-8">
        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Resultados */}
        {!loading && (
          <div className="mb-6">
            <p className="text-gray-600">
              Exibindo {carrosFiltrados.length} de {carros.length} veículos
            </p>
          </div>
        )}

        {/* Grade de Carros */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {carrosFiltrados.length > 0 ? carrosFiltrados.map((carro, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Imagem do Carro */}
                <div className="relative h-56 overflow-hidden">
                  {carro.fotos && carro.fotos.length > 0 ? (
                    <img 
                      src={carro.fotos[0]} 
                      alt={`${carro.marca} ${carro.modelo}`}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center" style={{display: carro.fotos && carro.fotos.length > 0 ? 'none' : 'flex'}}>
                    <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  
                  {/* Badge do Ano */}
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    {carro.ano}
                  </div>
                  
                  {/* Badge de Categoria */}
                  <div className="absolute top-4 left-4 bg-white text-gray-700 px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                    {carro.categoria?.toUpperCase()}
                  </div>
                </div>

                {/* Informações do Carro */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {carro.marca} {carro.modelo}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {carro.combustivel}
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      {carro.cambio}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                      {(carro.quilometragem || carro.km)?.toLocaleString('pt-BR')} km
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {carro.descricao}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatPrice(carro.preco)}
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium">
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center py-16">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                </svg>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum veículo encontrado</h3>
                <p className="text-gray-500 mb-4">Tente ajustar os filtros para encontrar o carro ideal</p>
                <button 
                  onClick={limparFiltros}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Limpar Filtros
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Não encontrou o que procurava?
          </h2>
          <p className="text-xl text-blue-100 mb-6">
            Nossa equipe pode ajudá-lo a encontrar o carro perfeito para suas necessidades
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contato"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Entre em Contato
            </a>
            <a 
              href="https://wa.me/5511999999999" 
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Carros;