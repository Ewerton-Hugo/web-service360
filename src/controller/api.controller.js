


const {ApiService} = require('../services/ApiService')
const {logger} = require('../config/logger')
const fs = require('fs');
const {xmlToJson, jsonToXml} = require('../providers/XmlToJson')

const apiService =  new ApiService();

class ApiController{

    async ResdisponibilizarUltimaTransmissao(req, res) {
        const jsonData = req.body;
        try {
            console.log('wwwww')
            const result = await apiService.resdisponibilizarUltimaTransmissao(jsonData.user, jsonData.pass);
            
            logger.warn("Executando consultarSelos:", result);
            
            res.status(200).send(result);    
        } catch (error) {
            console.log("####### ERRO CAPTURADO #######");
            console.error(error); // Exibe o erro completo no console
        
            logger.error("Erro ao processar ResdisponibilizarUltimaTransmissao:", {
                message: error.message,
                stack: error.stack
            });
    
            let statusCode = 500;
            let message = "Erro ao processar a requisição. Tente novamente mais tarde.";
    
            if (error.code === "ETIMEDOUT") {
                statusCode = 504;
                message = "Falha ao conectar com o Serviço do TJ. O servidor pode estar indisponível no momento.";
            }
    
            res.status(statusCode).json({ error: message, details: error.message });
        }
    }
    


    async FornecerSelos(req, res){

        const jsonData = req.body;
        try {
            const result = await apiService.FornecerSelos(jsonData.user, jsonData.pass,  jsonData.nuCns, jsonData.tipoCompra);
            logger.warn("Executando consultarSelos". result)

            res.status(200).send(result);    
        
    
      
        } catch (error) {
            console.log("#######")
            logger.error(error);
            // res.json(error)

          let statusCode = 500;
          let message = "Erro ao processar a requisição. Tente novamente mais tarde.";

          if (error.code === "ETIMEDOUT") {
              statusCode = 504; // Timeout Gateway
              message = "Falha ao conectar com o Serviço do TJ. O servidor pode estar indisponível no momento.";
          }

          res.status(statusCode).json({ error: message });
    
        }
    }
    async VerificaTransmissao(req, res){

        const jsonData = req.body;
        try {
            const result = await apiService.VerificaTransmissao(jsonData.user, jsonData.pass,  jsonData.nuCns);
            logger.warn("Executando VerificaTransmissao". result)

            res.status(200).send(result);    
        
    
      
        } catch (error) {
            console.log("#######")
            logger.error(error);
            // res.json(error)

          let statusCode = 500;
          let message = "Erro ao processar a requisição. Tente novamente mais tarde.";

          if (error.code === "ETIMEDOUT") {
              statusCode = 504; // Timeout Gateway
              message = "Falha ao conectar com o Serviço do TJ. O servidor pode estar indisponível no momento.";
          }

          res.status(statusCode).json({ error: message });
    
        }
    }

    async EmolumentoTransmissao(req, res){

        const jsonData = req.body;
        try {
            const result = await apiService.EmolumentoTransmissao(jsonData.user, jsonData.pass,  jsonData.messageIDtransmissao);
            logger.warn("Executando EmolumentoTransmissao". result)

            res.status(200).send(result);    
        
    
      
        } catch (error) {
            console.log("#######")
            logger.error(error);
            // res.json(error)

          let statusCode = 500;
          let message = "Erro ao processar a requisição. Tente novamente mais tarde.";

          if (error.code === "ETIMEDOUT") {
              statusCode = 504; // Timeout Gateway
              message = "Falha ao conectar com o Serviço do TJ. O servidor pode estar indisponível no momento.";
          }

          res.status(statusCode).json({ error: message });
    
        }
    }


    async DescontoTransmissao(req, res){

        const jsonData = req.body;
        try {
            const result = await apiService.DescontoTransmissao(jsonData.user, jsonData.pass, jsonData.nuLote, jsonData.statusSelo);
            logger.warn("Executando EmolumentoTransmissao". result)

            res.status(200).send(result);    
        
    
      
        } catch (error) {
            console.log("#######")
            logger.error(error);
            // res.json(error)

          let statusCode = 500;
          let message = "Erro ao processar a requisição. Tente novamente mais tarde.";

          if (error.code === "ETIMEDOUT") {
              statusCode = 504; // Timeout Gateway
              message = "Falha ao conectar com o Serviço do TJ. O servidor pode estar indisponível no momento.";
          }

          res.status(statusCode).json({ error: message });
    
        }
    }
    async enviarAtos (req, res)  {
        try {
            
            const { user, pass, xmlData } = req.body;
            // const file = req.file;

      
    
    
            const result = await apiService.enviarAtos(user, pass, xmlData);
    
            // Remove o arquivo temporário após o envio
            // fs.unlinkSync(file.path);
    
            res.status(200).json(result);
        } catch (error) {
            console.log("####### ERRO CAPTURADO #######");
            console.error(error); // Exibe o erro completo no console
        
            logger.error("Erro ao processar enviarAtos:", {
                message: error.message,
                stack: error.stack
            });
    
            let statusCode = 500;
            let message = "Erro ao processar a requisição. Tente novamente mais tarde.";
    
            if (error.code === "ETIMEDOUT") {
                statusCode = 504;
                message = "Falha ao conectar com o Serviço do TJ. O servidor pode estar indisponível no momento.";
            }
    
            res.status(statusCode).json({ error: message, details: error.message });
        }
    };

    async ReconhecimentoFirma (req, res)  {
        try {
            
            const { user, pass, xmlData } = req.body;
            // const file = req.file;

      
    
    
            const result = await apiService.ReconhecimentoFirma(user, pass, xmlData);
    
            // Remove o arquivo temporário após o envio
            // fs.unlinkSync(file.path);
    
            res.status(200).json(result);
        } catch (error) {
            console.log("####### ERRO CAPTURADO #######");
            console.error(error); // Exibe o erro completo no console
        
            // logger.error("Erro ao processar enviarAtos:", {
            //     message: error.message,
            //     stack: error.stack
            // });
    
            let statusCode = 500;
            let message = "Erro ao processar a requisição. Tente novamente mais tarde.";
    
            if (error.code === "ETIMEDOUT") {
                statusCode = 504;
                message = "Falha ao conectar com o Serviço do TJ. O servidor pode estar indisponível no momento.";
            }
    
            res.status(statusCode).json({ error: message, details: error.message });
        }
    };
 
    

    
}



module.exports={
    ApiController
}

