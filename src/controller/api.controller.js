


const {ApiService} = require('../services/ApiService')
const {logger} = require('../config/logger')
const fs = require('fs');
const {xmlToJson, jsonToXml} = require('../providers/XmlToJson')

const apiService =  new ApiService();

class ApiController{

    async ResdisponibilizarUltimaTransmissao(req, res) {
        const jsonData = req.body;
        try {
            const result = await apiService.resdisponibilizarUltimaTransmissao(jsonData.user, jsonData.pass);
            
            logger.warn("Executando consultarSelos:", result);
            
            res.status(200).send(result);    
        } catch (error) {
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
    


    async FornecerSelos(req, res) {
        const jsonData = req.body;
        
        try {
            const result = await apiService.FornecerSelos(
                jsonData.user,
                jsonData.pass,
                jsonData.nuCns,
                jsonData.tipoCompra
            );
    
            logger.warn("Executando consultarSelos", result);
    
            res.status(200).send(result);
        } catch (error) {
            logger.error(error);
    
            let statusCode = 500;
            let message = "Erro ao processar a requisição. Tente novamente mais tarde.";
            let details = {};
    
            if (error.response) {
                // O servidor respondeu com um status de erro
                statusCode = error.response.status || 500;
                message = error.response.statusText || "Erro desconhecido no servidor.";
                details = {
                    status: error.response.status,
                    statusText: error.response.statusText,
                    data: error.response.data, // Detalhes do erro retornado pelo servidor
                    headers: error.response.headers, // Cabeçalhos da resposta
                };
            } else if (error.request) {
                // A requisição foi feita, mas não houve resposta do servidor
                statusCode = 504;
                message = "Falha ao conectar com o serviço do TJ. O servidor pode estar indisponível.";
                details = { request: error.request };
            } else {
                // Erro na configuração da requisição
                message = error.message;
                details = { stack: error.stack };
            }
    
            res.status(statusCode).json({ error: message, details });
        }
    }
    
    async VerificaTransmissao(req, res){

        const jsonData = req.body;
        try {
            const result = await apiService.VerificaTransmissao(jsonData.user, jsonData.pass,  jsonData.nuCns);
            logger.warn("Executando VerificaTransmissao". result)

            res.status(200).send(result);    
        
    
      
        } catch (error) {
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
    async registroTitulosDocPJ(req, res)  {
        try {
            const { user, pass, xmlData } = req.body;
            const result = await apiService.registroTitulosDocPJ(user, pass, xmlData);

            res.status(200).json(result);
        } catch (error) {
            console.error(error); 
        
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

    
    async registroImoveis(req, res)  {
        try {
            const { user, pass, xmlData } = req.body;
            const result = await apiService.registroImoveis(user, pass, xmlData);

            res.status(200).json(result);
        } catch (error) {
            console.error(error); 
        
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

    
    async nascimento(req, res)  {
        try {
            const { user, pass, xmlData } = req.body;
            const result = await apiService.nascimento(user, pass, xmlData);

            res.status(200).json(result);
        } catch (error) {
            console.error(error); 
        
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
    
    async notaGenerica(req, res)  {
        try {
            const { user, pass, xmlData } = req.body;
            const result = await apiService.notaGenerica(user, pass, xmlData);

            res.status(200).json(result);
        } catch (error) {
            console.error(error); 
        
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

    async notaGenerica(req, res)  {
        try {
            const { user, pass, xmlData } = req.body;
            const result = await apiService.notaGenerica(user, pass, xmlData);

            res.status(200).json(result);
        } catch (error) {
            console.error(error); 
        
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
    async notaEscrituraria(req, res)  {
        try {
            const { user, pass, xmlData } = req.body;
            const result = await apiService.notaEscrituraria(user, pass, xmlData);

            res.status(200).json(result);
        } catch (error) {
            console.error(error); 
        
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

