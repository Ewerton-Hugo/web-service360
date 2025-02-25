const express = require('express');
const routes = express.Router();
const { ApiController } = require('../controller/api.controller');
const apiController = new ApiController();
const { upload } = require('../config/multer');



routes.post('/resdisponibilizar_Ultima_Transmissao', apiController.ResdisponibilizarUltimaTransmissao);
routes.post('/fornecer_Selos', apiController.FornecerSelos);
routes.post('/enviar/registro_titulos_doc_pJ', apiController.registroTitulosDocPJ);
routes.post('/enviar/registro_imoveis', apiController.registroImoveis);//erro
routes.post('/enviar/nascimento', apiController.nascimento);//DeuCerto
routes.post('/enviar/nota_generica', apiController.notaGenerica);//DeuCerto
routes.post('/enviar/nota_escrituraria', apiController.notaEscrituraria);//DeuCerto

routes.post('/enviaratos_reconhecimento_firma', apiController.ReconhecimentoFirma);

routes.post('/verifica_transmissao',apiController.VerificaTransmissao);
routes.post('/emolumento_transmissao',apiController.EmolumentoTransmissao);
routes.post('/desconto_transmissao',apiController.DescontoTransmissao);
// routes.get('/',apiController.teste);

                        
module.exports = {
    routes,
};
// const express = require('express');
// const routes = express.Router();



// const axios = require('axios');
// const fs = require('fs');
// const FormData = require('form-data');

// async function enviarAtos(user, pass, filePath) {
//     // Cria uma nova instância de FormData
//     const form = new FormData();

//     // Adiciona os parâmetros de entrada
//     form.append('user', user);
//     form.append('pass', pass);
//     form.append('arquivo', fs.createReadStream(filePath)); // Lê o arquivo a ser enviado

//     try {
//         // Faz a requisição POST para o endpoint do WebService
//         const response = await axios.post('https://hmlselows.tjal.jus.br/SeloCore/SeloService', form, {
//             headers: {
//                 ...form.getHeaders(), // Adiciona os headers do FormData
//             },
//         });

//         // Retorna a resposta do WebService
//         console.log('Resposta do WebService:', response.data);
//     } catch (error) {
//         console.error('Erro ao enviar atos:', error.response ? error.response.data : error.message);
//     }
// }






// routes.get('/', (req, res) => {
//   enviarAtos('41140940406', 'SLWLGF', '/home/ewerto/Documentos/Projetos/cartorio360-web-service/src/XML/ExemploATO.xml');
//   // res.status(200).send({
//   //   status: 200,
//   //   message: 'OK',
//   // });
// })

// module.exports = {
//   routes,
// };
