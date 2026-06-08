const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Configuração do CORS atualizada e aberta para receber requisições da nuvem
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// STRING DE CONEXÃO DO MONGODB ATLAS
const MONGO_URI = "mongodb+srv://Fabio:Fabio4040@users.hcegzhv.mongodb.net/?retryWrites=true&w=majority&appName=Users";

mongoose.connect(MONGO_URI)
    .then(() => console.log("🔌 Conectado com sucesso ao MongoDB Atlas!"))
    .catch((err) => console.error("❌ Erro ao conectar ao MongoDB:", err.message));

// Schemas do Banco de Dados
const ReservaSchema = new mongoose.Schema({
    nome: String,
    email: String,
    telefone: String,
    pessoas: String,
    data: String,
    hora: String,
    obs: String,
    status: { type: String, default: 'Pendente' },
    criadoEm: { type: Date, default: Date.now }
});
const Reserva = mongoose.model('Reserva', ReservaSchema);

const BloqueioSchema = new mongoose.Schema({
    data: { type: String, required: true },
    hora: { type: String, default: 'Todos' }
});
const Bloqueio = mongoose.model('Bloqueio', BloqueioSchema);


// ==========================================
// ROTAS DE RESERVAS
// ==========================================
app.post('/api/reservas', async (req, res) => {
    try {
        const { nome, email, telephone, telefone, pessoas, data, hora, obs } = req.body;
        const telefoneFinal = telephone || telefone; 

        const jaBloqueado = await Bloqueio.findOne({ data, $or: [{ hora: 'Todos' }, { hora }] });
        if (jaBloqueado) {
            return res.status(400).json({ status: 'erro', mensagem: 'Desculpe, esta data ou horário não está disponível.' });
        }

        const novaReserva = new Reserva({ nome, email, telefone: telefoneFinal, pessoas, data, hora, obs });
        await novaReserva.save();
        return res.status(201).json({ status: 'sucesso', message: 'Reserva gravada no MongoDB!' });
    } catch (err) {
        return res.status(500).json({ status: 'erro', message: err.message });
    }
});

app.get('/api/reservas', async (req, res) => {
    try {
        const listaReservas = await Reserva.find({ status: { $ne: 'Finalizada' } }).sort({ criadoEm: -1 });
        return res.json(listaReservas);
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao carregar dados.' });
    }
});

app.get('/api/reservas/historico', async (req, res) => {
    try {
        const historico = await Reserva.find({ status: 'Finalizada' }).sort({ data: -1, hora: -1 });
        return res.json(historico);
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao carregar histórico.' });
    }
});

app.put('/api/reservas/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { novoStatus } = req.body;
        await Reserva.findByIdAndUpdate(id, { status: novoStatus });
        return res.json({ status: 'sucesso' });
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao atualizar status.' });
    }
});


// ==========================================
// ROTAS DE BLOQUEIOS
// ==========================================
app.post('/api/bloqueios', async (req, res) => {
    try {
        const { data, hora } = req.body;
        const existente = await Bloqueio.findOne({ data, hora });
        if (existente) return res.status(400).json({ status: 'erro', mensagem: 'Este bloqueio já existe.' });

        const novoBloqueio = new Bloqueio({ data, hora: hora || 'Todos' });
        await novoBloqueio.save();
        return res.status(201).json({ status: 'sucesso', mensagem: 'Bloqueio aplicado com sucesso!' });
    } catch (err) {
        return res.status(500).json({ status: 'erro', mensagem: err.message });
    }
});

app.get('/api/bloqueios', async (req, res) => {
    try {
        const listaBloqueios = await Bloqueio.find().sort({ data: 1 });
        return res.json(listaBloqueios);
    } catch (err) {
        return res.status(500).json({ status: 'erro', mensagem: err.message });
    }
});

app.delete('/api/bloqueios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Bloqueio.findByIdAndDelete(id);
        return res.json({ status: 'sucesso', mensagem: 'Bloqueio removido!' });
    } catch (err) {
        return res.status(500).json({ status: 'erro', mensagem: err.message });
    }
});


// CONFIGURAÇÃO DA PORTA DINÂMICA DO RENDER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando perfeitamente na porta ${PORT}`);
});