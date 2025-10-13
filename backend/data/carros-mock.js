// Dados mockados de carros para demonstração
export const carrosMock = [
  {
    id: 1,
    marca: "Toyota",
    modelo: "Corolla",
    ano: 2023,
    preco: 125000,
    quilometragem: 15000,
    combustivel: "Flex",
    cambio: "Automático",
    cor: "Prata",
    descricao: "Sedã executivo com excelente custo-benefício, ideal para uso urbano e viagens.",
    fotos: [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop"
    ],
    disponivel: true,
    categoria: "sedan"
  },
  {
    id: 2,
    marca: "Honda",
    modelo: "Civic",
    ano: 2022,
    preco: 135000,
    quilometragem: 25000,
    combustivel: "Flex",
    cambio: "Manual",
    cor: "Preto",
    descricao: "Sedã esportivo com design moderno e performance excepcional.",
    fotos: [
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop"
    ],
    disponivel: true,
    categoria: "sedan"
  },
  {
    id: 3,
    marca: "Volkswagen",
    modelo: "T-Cross",
    ano: 2023,
    preco: 98000,
    quilometragem: 8000,
    combustivel: "Flex",
    cambio: "Automático",
    cor: "Branco",
    descricao: "SUV compacto perfeito para a família, com amplo espaço interno e tecnologia.",
    fotos: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
    ],
    disponivel: true,
    categoria: "suv"
  },
  {
    id: 4,
    marca: "Chevrolet",
    modelo: "Onix",
    ano: 2024,
    preco: 85000,
    quilometragem: 5000,
    combustivel: "Flex",
    cambio: "Manual",
    cor: "Vermelho",
    descricao: "Hatch moderno e econômico, ideal para jovens e primeiros carros.",
    fotos: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1494976688153-d4c447cb7688?w=800&h=600&fit=crop"
    ],
    disponivel: true,
    categoria: "hatch"
  },
  {
    id: 5,
    marca: "Ford",
    modelo: "Ka",
    ano: 2021,
    preco: 65000,
    quilometragem: 35000,
    combustivel: "Flex",
    cambio: "Manual",
    cor: "Azul",
    descricao: "Compacto urbano com baixo consumo e fácil manutenção.",
    fotos: [
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=800&h=600&fit=crop"
    ],
    disponivel: true,
    categoria: "hatch"
  },
  {
    id: 6,
    marca: "Nissan",
    modelo: "Kicks",
    ano: 2022,
    preco: 110000,
    quilometragem: 18000,
    combustivel: "Flex",
    cambio: "CVT",
    cor: "Laranja",
    descricao: "SUV urbano com design arrojado e tecnologia de ponta.",
    fotos: [
      "https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop"
    ],
    disponivel: true,
    categoria: "suv"
  },
  {
    id: 7,
    marca: "Hyundai",
    modelo: "HB20",
    ano: 2023,
    preco: 75000,
    quilometragem: 12000,
    combustivel: "Flex",
    cambio: "Manual",
    cor: "Cinza",
    descricao: "Hatch versátil com bom espaço interno e excelente garantia.",
    fotos: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop"
    ],
    disponivel: true,
    categoria: "hatch"
  },
  {
    id: 8,
    marca: "Jeep",
    modelo: "Compass",
    ano: 2022,
    preco: 165000,
    quilometragem: 22000,
    combustivel: "Flex",
    cambio: "Automático",
    cor: "Branco",
    descricao: "SUV robusto com capacidade off-road e luxo no acabamento.",
    fotos: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop"
    ],
    disponivel: true,
    categoria: "suv"
  },
  {
    id: 9,
    marca: "Renault",
    modelo: "Kwid",
    ano: 2021,
    preco: 55000,
    quilometragem: 28000,
    combustivel: "Flex",
    cambio: "Manual",
    cor: "Verde",
    descricao: "Compacto econômico com design único e baixo custo de manutenção.",
    fotos: [
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1494976688153-d4c447cb7688?w=800&h=600&fit=crop"
    ],
    disponivel: true,
    categoria: "hatch"
  },
  {
    id: 10,
    marca: "Fiat",
    modelo: "Toro",
    ano: 2023,
    preco: 145000,
    quilometragem: 10000,
    combustivel: "Diesel",
    cambio: "Automático",
    cor: "Prata",
    descricao: "Picape média com design italiano e versatilidade para trabalho e lazer.",
    fotos: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?w=800&h=600&fit=crop"
    ],
    disponivel: true,
    categoria: "picape"
  },
  {
    id: 11,
    marca: "BMW",
    modelo: "320i",
    ano: 2021,
    preco: 285000,
    quilometragem: 30000,
    combustivel: "Gasolina",
    cambio: "Automático",
    cor: "Preto",
    descricao: "Sedã premium com performance esportiva e luxo alemão.",
    fotos: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop"
    ],
    disponivel: true,
    categoria: "sedan"
  },
  {
    id: 12,
    marca: "Audi",
    modelo: "A3",
    ano: 2022,
    preco: 215000,
    quilometragem: 16000,
    combustivel: "Gasolina",
    cambio: "S-Tronic",
    cor: "Branco",
    descricao: "Hatch premium com tecnologia avançada e design sofisticado.",
    fotos: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop"
    ],
    disponivel: true,
    categoria: "hatch"
  }
];