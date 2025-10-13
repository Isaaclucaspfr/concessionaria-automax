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

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

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

// Rota principal
app.get("/", (req, res) => res.send("API da Concessionária está online!"));

// CRUD de carros
app.get("/api/carros", async (req, res) => {
  const filtro = {};
  if (req.query.marca) filtro.marca = req.query.marca;
  const carros = await Carro.find(filtro);
  res.json(carros);
});

app.post("/api/carros", upload.array("fotos", 5), async (req, res) => {
  const { marca, modelo, ano, cor, preco, km, descricao } = req.body;
  const fotos = req.files.map((f) => f.filename);
  const carro = new Carro({ marca, modelo, ano, cor, preco, km, descricao, fotos });
  await carro.save();
  res.json(carro);
});

app.delete("/api/carros/:id", async (req, res) => {
  await Carro.findByIdAndDelete(req.params.id);
  res.json({ mensagem: "Carro deletado" });
});

// Contatos
app.post("/api/contatos", async (req, res) => {
  const contato = new Contato(req.body);
  await contato.save();
  res.json({ mensagem: "Contato recebido" });
});

// Admin - login e criação inicial
app.post("/api/admin/init", async (req, res) => {
  const existe = await Admin.findOne({ email: "admin@concessionaria.com" });
  if (existe) return res.json({ mensagem: "Admin já existe" });
  const senhaHash = await bcrypt.hash("admin123", 10);
  await Admin.create({ email: "admin@concessionaria.com", senha: senhaHash });
  res.json({ mensagem: "Admin criado", email: "admin@concessionaria.com", senha: "admin123" });
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

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend/build"))); // Create React App

// Catch-all handler: envia o arquivo index.html para qualquer rota não encontrada
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

// Iniciar servidor
app.listen(process.env.PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${process.env.PORT}`);
});
