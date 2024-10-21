// Importação de dependencias
require(`dotenv`).config(); // Carrega variaveis de ambiente de um arquivo .env
const express = require(`express`);
const helmet = require(`helmet`);
const morgam = require(`morgan`);
const cors = require(`cors`);
const path = require(`path`);
const routes = require(`./routes/routes`);
const db = require(`./db/db`);
const clienteRoutes = require(`./routes/clienteroutes`);
const corsOptions = {
    origin: [`http://localhost:3333`, `https://meudominio.com`], //Lista de origens permitidas
    methods: `GET,POST,PUT,DELETE`, //método HTTP permitidos
    Credentials: true, //Permite o envio de cookies
};
// Inicialização do aplicativo
const app = express();
// Middleware de segurança e utilidades
app.use(helmet()); // protege a aplicação com headers de segurança
app.use(cors(corsOptions)); // habilidade o cors
app.use(morgam(`dev`)); // Loga as requisições no console
app.use(express.json()); // Converte os dados recebidos para JSON

app.use(express.static(path.join(__dirname, `public`))); //Pasta de arquivos estáticos
// Rota para servir o home.html
app.get(`/`, (req, res) => {
    res.sendfile(path.join(__dirname, `pages`, `home.html`));

});

// Configuração de rotas
app.use(`/`, routes);
app.use(`/`, clienteRoutes); //Usa as rotas de clientes sob o caminho /api/clientes

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`Algo deu errado!`);

});
//inicialização do servidor
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`SERVIDOR RODANDO NA PORTA ${PORT}`);

});
