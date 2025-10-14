import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [carros, setCarros] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    ano: '',
    preco: '',
    km: '',
    cambio: 'Manual',
    combustivel: 'Flex',
    cor: '',
    portas: '4',
    fotos: [''],
    opcionais: '',
    descricao: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchCarros();
  }, [navigate]);

  const fetchCarros = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/carros');
      const data = await response.json();
      setCarros(data);
    } catch (error) {
      console.error('Erro ao buscar carros:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const carData = {
      ...formData,
      ano: parseInt(formData.ano),
      preco: parseFloat(formData.preco),
      km: parseInt(formData.km),
      portas: parseInt(formData.portas),
      opcionais: formData.opcionais.split(',').map(item => item.trim()).filter(Boolean)
    };

    try {
      const url = editingCar 
        ? `http://localhost:5000/api/carros/${editingCar.id}`
        : 'http://localhost:5000/api/carros';
      
      const method = editingCar ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
      });

      if (response.ok) {
        alert(editingCar ? 'Carro atualizado com sucesso!' : 'Carro cadastrado com sucesso!');
        setShowForm(false);
        setEditingCar(null);
        resetForm();
        fetchCarros();
      }
    } catch (error) {
      alert('Erro ao salvar carro');
      console.error(error);
    }
  };

  const handleEdit = (carro) => {
    setEditingCar(carro);
    setFormData({
      marca: carro.marca || '',
      modelo: carro.modelo || '',
      ano: (carro.ano || '').toString(),
      preco: (carro.preco || '').toString(),
      km: (carro.km || '').toString(),
      cambio: carro.cambio || 'Manual',
      combustivel: carro.combustivel || 'Flex',
      cor: carro.cor || '',
      portas: (carro.portas || '4').toString(),
      fotos: carro.fotos || [''],
      opcionais: Array.isArray(carro.opcionais) ? carro.opcionais.join(', ') : '',
      descricao: carro.descricao || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este carro?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/carros/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Carro excluído com sucesso!');
        fetchCarros();
      }
    } catch (error) {
      alert('Erro ao excluir carro');
      console.error(error);
    }
  };

  const resetForm = () => {
    setFormData({
      marca: '',
      modelo: '',
      ano: '',
      preco: '',
      km: '',
      cambio: 'Manual',
      combustivel: 'Flex',
      cor: '',
      portas: '4',
      fotos: [''],
      opcionais: '',
      descricao: ''
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-white text-2xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header Admin */}
      <header className="bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-lg border-b border-purple-500 border-opacity-30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-2 rounded-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                </svg>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                SZX CARS Admin
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                style={{ backgroundColor: '#ffffff', color: '#1f2937', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', border: '2px solid #9333ea', cursor: 'pointer' }}
                className="hover:bg-purple-50 transition-all transform hover:scale-105 shadow-md"
              >
                Ver Site
              </button>
              <button
                onClick={handleLogout}
                style={{ backgroundColor: '#dc2626', color: '#ffffff', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', border: 'none', cursor: 'pointer' }}
                className="hover:bg-red-700 transition-all transform hover:scale-105 shadow-md"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Action Buttons */}
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-white">Gerenciar Carros</h2>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingCar(null);
              resetForm();
            }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transform hover:scale-105 transition-all shadow-lg"
          >
            {showForm ? '✕ Cancelar' : '+ Novo Carro'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 border border-purple-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {editingCar ? 'Editar Carro' : 'Cadastrar Novo Carro'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-900 font-semibold mb-2">Marca</label>
                  <input
                    type="text"
                    name="marca"
                    value={formData.marca}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:border-purple-500 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 font-semibold mb-2">Modelo</label>
                  <input
                    type="text"
                    name="modelo"
                    value={formData.modelo}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:border-purple-500 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 font-semibold mb-2">Ano</label>
                  <input
                    type="number"
                    name="ano"
                    value={formData.ano}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:border-purple-500 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 font-semibold mb-2">Preço (R$)</label>
                  <input
                    type="number"
                    name="preco"
                    value={formData.preco}
                    onChange={handleInputChange}
                    required
                    step="0.01"
                    className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:border-purple-500 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 font-semibold mb-2">Quilometragem</label>
                  <input
                    type="number"
                    name="km"
                    value={formData.km}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:border-purple-500 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 font-semibold mb-2">Câmbio</label>
                  <select
                    name="cambio"
                    value={formData.cambio}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:border-purple-500 focus:outline-none transition-all"
                  >
                    <option value="Manual">Manual</option>
                    <option value="Automático">Automático</option>
                    <option value="CVT">CVT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-900 font-semibold mb-2">Combustível</label>
                  <select
                    name="combustivel"
                    value={formData.combustivel}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:border-purple-500 focus:outline-none transition-all"
                  >
                    <option value="Flex">Flex</option>
                    <option value="Gasolina">Gasolina</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Elétrico">Elétrico</option>
                    <option value="Híbrido">Híbrido</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-900 font-semibold mb-2">Cor</label>
                  <input
                    type="text"
                    name="cor"
                    value={formData.cor}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:border-purple-500 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 font-semibold mb-2">Portas</label>
                  <select
                    name="portas"
                    value={formData.portas}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:border-purple-500 focus:outline-none transition-all"
                  >
                    <option value="2">2 Portas</option>
                    <option value="4">4 Portas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-900 font-semibold mb-2">Nome da Foto (ex: civic.png)</label>
                  <input
                    type="text"
                    name="fotos"
                    value={formData.fotos[0]}
                    onChange={(e) => setFormData({ ...formData, fotos: [e.target.value] })}
                    placeholder="civic.png"
                    className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:border-purple-500 focus:outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-900 font-semibold mb-2">Opcionais (separados por vírgula)</label>
                <textarea
                  name="opcionais"
                  value={formData.opcionais}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Ar condicionado, Direção elétrica, Airbags"
                  className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:border-purple-500 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-gray-900 font-semibold mb-2">Descrição</label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:border-purple-500 focus:outline-none transition-all"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-6 rounded-lg font-semibold transform hover:scale-105 transition-all shadow-lg"
                >
                  {editingCar ? 'Atualizar Carro' : 'Cadastrar Carro'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingCar(null);
                    resetForm();
                  }}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Cars List */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-purple-300">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Carros Cadastrados ({carros.length})</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-900">
              <thead className="bg-purple-100">
                <tr>
                  <th className="px-4 py-3 font-semibold">ID</th>
                  <th className="px-4 py-3 font-semibold">Marca</th>
                  <th className="px-4 py-3 font-semibold">Modelo</th>
                  <th className="px-4 py-3 font-semibold">Ano</th>
                  <th className="px-4 py-3 font-semibold">Preço</th>
                  <th className="px-4 py-3 font-semibold">KM</th>
                  <th className="px-4 py-3 font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody>
                {carros.map((carro) => (
                  <tr key={carro.id} className="border-b border-gray-200 hover:bg-purple-50 transition-all">
                    <td className="px-4 py-4">{carro.id}</td>
                    <td className="px-4 py-4">{carro.marca || 'N/A'}</td>
                    <td className="px-4 py-4">{carro.modelo || 'N/A'}</td>
                    <td className="px-4 py-4">{carro.ano || 'N/A'}</td>
                    <td className="px-4 py-4">R$ {(carro.preco || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className="px-4 py-4">{(carro.km || 0).toLocaleString('pt-BR')} km</td>
                    <td className="px-4 py-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEdit(carro)}
                          style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '8px 16px', borderRadius: '8px', fontWeight: '600', border: 'none', cursor: 'pointer' }}
                          className="hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(carro.id)}
                          style={{ backgroundColor: '#dc2626', color: '#ffffff', padding: '8px 16px', borderRadius: '8px', fontWeight: '600', border: 'none', cursor: 'pointer' }}
                          className="hover:bg-red-700 transition-all transform hover:scale-105 shadow-md"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
