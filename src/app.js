const https = require('https');
const http = require('http');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
// const { sequelize } = require('./config/sequelizeConf');
const { routes } = require('./routes/api.routes');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.MS_MANAGEMENT_PORT || 3333;
const isProduction = process.env.PROJECT;

let server;

if (process.env.PROJECT === 'production') {
  // Configurações de produção (HTTPS com certificados)
  const httpsOptions = {
    key: fs.readFileSync(process.env.SSLCertificateKeyFile || 'path/to/server.key'),
    cert: fs.readFileSync(process.env.SSLCertificateFile || 'path/to/server.crt'),
  };

  server = https.createServer(httpsOptions, app);
  console.log("Iniciando servidor em modo produção com HTTPS.");
} else {
  // Configurações de desenvolvimento (HTTP sem certificados)
  server = http.createServer(app);
  console.log("Iniciando servidor em modo desenvolvimento com HTTP.");
}

app.use(bodyParser.json());
app.use(routes);
app.use(bodyParser.json({ limit: '100mb' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
// sequelize.sync()
//   .then(() => {
//     server.listen(PORT, () => {
//       console.log(`Servidor rodando na porta ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error('Erro ao conectar ao banco de dados:', error);
//   });

module.exports = app;
