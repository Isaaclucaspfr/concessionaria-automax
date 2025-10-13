import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import multer from "multer";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import fs from "fs";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Verificar variáveis de ambiente essenciais
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_jwt_secret';

console.log('🔍 Variáveis de ambiente carregadas:');
console.log('MONGODB_URI:', MONGODB_URI ? 'Configurado' : 'Não configurado');
console.log('JWT_SECRET:', JWT_SECRET ? 'Configurado' : 'Não configurado');
console.log('PORT:', process.env.PORT || '5000');

// Conexão com MongoDB (opcional para desenvolvimento)
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log("✅ MongoDB conectado"))
    .catch((err) => {
      console.error("❌ Erro ao conectar ao MongoDB:", err);
      console.log("⚠️ Continuando sem MongoDB (modo desenvolvimento)");
    });
} else {
  console.log("⚠️ MongoDB não configurado - rodando sem banco de dados");
}

// Uploads
const uploadDir = process.env.UPLOAD_DIR || "./uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Modelos
const Carro = mongoose.model("Carro", new mongoose.Schema({
  marca: String,
  modelo: String,
  ano: Number,
  cor: String,
  preco: Number,
  km: Number,
  descricao: String,
  fotos: [String],
}));

const Admin = mongoose.model("Admin", new mongoose.Schema({
  email: String,
  senha: String,
}));

const Contato = mongoose.model("Contato", new mongoose.Schema({
  nome: String,
  telefone: String,
  email: String,
  mensagem: String,
}));

// CRUD de carros
app.get("/api/carros", async (req, res) => {
  try {
    const filtro = {};
    if (req.query.marca) filtro.marca = req.query.marca;
    const carros = await Carro.find(filtro);
    res.json(carros);
  } catch (error) {
    console.error("Erro ao buscar carros:", error);
    // Retornar dados mock se o banco não estiver disponível
    res.json([]);
  }
});

app.post("/api/carros", upload.array("fotos", 5), async (req, res) => {
  try {
    const { marca, modelo, ano, cor, preco, km, descricao } = req.body;
    const fotos = req.files.map((f) => f.filename);
    const carro = new Carro({ marca, modelo, ano, cor, preco, km, descricao, fotos });
    await carro.save();
    res.json(carro);
  } catch (error) {
    console.error("Erro ao salvar carro:", error);
    res.status(500).json({ erro: "Erro ao salvar carro" });
  }
});

app.delete("/api/carros/:id", async (req, res) => {
  await Carro.findByIdAndDelete(req.params.id);
  res.json({ mensagem: "Carro deletado" });
});

// Contatos
app.post("/api/contatos", async (req, res) => {
  try {
    const contato = new Contato(req.body);
    await contato.save();
    res.json({ mensagem: "Contato recebido" });
  } catch (error) {
    console.error("Erro ao salvar contato:", error);
    // Simular sucesso mesmo sem banco (para desenvolvimento)
    console.log("Dados do contato:", req.body);
    res.json({ mensagem: "Contato recebido (modo desenvolvimento)" });
  }
});

// Rota para popular dados iniciais
app.post("/api/popular-dados", async (req, res) => {
  try {
    // Verificar se já existem carros
    const carrosExistentes = await Carro.countDocuments();
    if (carrosExistentes > 0) {
      return res.json({ mensagem: "Dados já existem no banco" });
    }

    // Dados dos carros de exemplo
    const carrosIniciais = [
      {
        marca: "Honda",
        modelo: "Civic",
        ano: 2022,
        cor: "Prata",
        preco: 89900,
        km: 15000,
        descricao: "Honda Civic 2022 em excelente estado, único dono, revisões em dia na concessionária."
      },
      {
        marca: "Toyota",
        modelo: "Corolla",
        ano: 2023,
        cor: "Branco",
        preco: 95500,
        km: 8000,
        descricao: "Toyota Corolla XEI 2023, seminovo, com todas as revisões em dia. Carro em perfeito estado."
      },
      {
        marca: "Volkswagen",
        modelo: "Jetta",
        ano: 2021,
        cor: "Preto",
        preco: 78900,
        km: 22000,
        descricao: "VW Jetta 2021, completo com couro, multimídia e câmera de ré. Impecável!"
      },
      {
        marca: "Hyundai",
        modelo: "HB20",
        ano: 2023,
        cor: "Vermelho",
        preco: 62900,
        km: 5000,
        descricao: "Hyundai HB20 Evolution 2023, praticamente zero km. Ideal para quem busca economia."
      },
      {
        marca: "Chevrolet",
        modelo: "Onix",
        ano: 2022,
        cor: "Azul",
        preco: 58900,
        km: 12000,
        descricao: "Chevrolet Onix Plus LT 2022, automático, ar condicionado, direção elétrica."
      },
      {
        marca: "Ford",
        modelo: "Ka",
        ano: 2021,
        cor: "Branco",
        preco: 45900,
        km: 28000,
        descricao: "Ford Ka SEL 2021, completo, único dono, ótima opção para cidade."
      }
    ];

    // Inserir carros no banco
    await Carro.insertMany(carrosIniciais);

    res.json({ 
      mensagem: "Dados iniciais criados com sucesso!",
      carrosAdicionados: carrosIniciais.length 
    });
  } catch (error) {
    console.error("Erro ao popular dados:", error);
    res.status(500).json({ erro: "Erro ao popular dados iniciais" });
  }
});

// Admin - login e criação inicial
app.post("/api/admin/init", async (req, res) => {
  try {
    const existe = await Admin.findOne({ email: "admin@concessionaria.com" });
    if (existe) return res.json({ mensagem: "Admin já existe" });
    const senhaHash = await bcrypt.hash("admin123", 10);
    await Admin.create({ email: "admin@concessionaria.com", senha: senhaHash });
    res.json({ mensagem: "Admin criado", email: "admin@concessionaria.com", senha: "admin123" });
  } catch (error) {
    console.error("Erro ao criar admin:", error);
    res.status(500).json({ erro: "Erro ao criar admin" });
  }
});

app.post("/api/admin/login", async (req, res) => {
  const { email, senha } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ erro: "Admin não encontrado" });
  const ok = await bcrypt.compare(senha, admin.senha);
  if (!ok) return res.status(401).json({ erro: "Senha incorreta" });
  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
  res.json({ token });
});

// Servir uploads
app.use("/uploads", express.static(path.resolve(uploadDir)));

// Configuração para servir o frontend React (deve ser APÓS todas as rotas da API)
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir arquivos estáticos do React
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Middleware de tratamento de erros
app.use((error, req, res, next) => {
  console.error('❌ Erro no servidor:', error);
  res.status(500).json({ erro: 'Erro interno do servidor' });
});

// Catch-all handler: serve o index.html para todas as rotas não-API (roteamento client-side do React)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
