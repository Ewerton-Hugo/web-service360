const axios = require('axios');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const FormData = require('form-data');
const {setAto} = require('../providers/SetAto')
const {SetRegistroImovel} = require('../providers/SetRegistroImovel')
const { SetNascimento } = require('../providers/SetNascimento')
const { SetNotaGenerica } = require('../providers/SetNotaGenerica')
const { SetNotasEscrituratias } = require('../providers/SetNotasEscrituratias')
const { SetProtestoGenerico } = require('../providers/SetProtestoGenerico')

const {SetReconhecimentoFirma} = require('../providers/SetReconhecimentoFirma')
const { DOMParser } = require('xmldom');
const {xmlToJson, extrairSelos,extractMultipartData,extrairMEnsagemSimples} = require('../providers/XmlToJson');
const e = require('cors');

const arquivoPath = path.join(__dirname, '..','XML', 'temp.xml');


class ApiService {

    static webservice;  

    static {
        this.webservice = process.env.PROJECT === 'production' 
            ? process.env.TJ_PRODUCTION 
            : process.env.TJ_DESENV;
    }
    async resdisponibilizarUltimaTransmissao(user, pass) {

        const soapEnvelope = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:selo="http://www.tjal.jus.br/selo">  
            <soapenv:Header/>  
            <soapenv:Body>  
                <selo:redisponibilizaUltimaTransmissaoSelos>  
                    <user>${user}</user>  
                    <pass>${pass}</pass>  
                </selo:redisponibilizaUltimaTransmissaoSelos>  
            </soapenv:Body>  
        </soapenv:Envelope> 
        `;
            const response = await axios.post(

                ApiService.webservice,
                soapEnvelope,
                {
                    headers: {
                        'Content-Type': 'text/xml;charset=UTF-8',
                        'SOAPAction': '',
                    },
                }
            );
            
            const data ={
                response: `Total de selos redisponibvlizados: ${extrairMEnsagemSimples(response.data, 'numeroSelosLiberados')} `,
            }

        return data;


    }

    async FornecerSelos(user, pass,nuCns,tipoCompra = 1) {
        const soapEnvelope = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:selo="http://www.tjal.jus.br/selo">
            <soapenv:Header/>
            <soapenv:Body>
                <selo:fornecerSelos>
                    <user>${user}</user>
                    <pass>${pass}</pass>
                    <nuCNS>${nuCns}</nuCNS>
                    <tipoCompra>${tipoCompra}</tipoCompra>
                </selo:fornecerSelos>
            </soapenv:Body>
        </soapenv:Envelope> 
        `;

            const response = await axios.post(

                ApiService.webservice,
                soapEnvelope,
                {
                    headers: {
                        'Content-Type': 'text/xml;charset=UTF-8',
                        'SOAPAction': '',
                    },
                }
            );

            // return response.data;        
            return extrairSelos(response.data);

    }


    async VerificaTransmissao(user, pass,nuCns,messageIDtransmissao ) {
        const soapEnvelope = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:selo="http://www.tjal.jus.br/selo">
            <soapenv:Header/>
            <soapenv:Body>
                <selo:verificaTransmissao>
                    <user>${user}</user>
                    <pass>${pass}</pass>
                    <messageIDtransmissao>${messageIDtransmissao}</messageIDtransmissao>
                </selo:verificaTransmissao>
            </soapenv:Body>
        </soapenv:Envelope> 
        `;

            const response = await axios.post(

                ApiService.webservice,
                soapEnvelope,
                {
                    headers: {
                        'Content-Type': 'text/xml;charset=UTF-8',
                        'SOAPAction': '',
                    },
                }
            );

            return response.data;        



    }

    async EmolumentoTransmissao(user, pass,cns) {
        const soapEnvelope = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:selo="http://www.tjal.jus.br/selo">
            <soapenv:Header/>
            <soapenv:Body>
                <selo:emolumentoTransmissao>
                    <user>"41140940406"</user>
                    <pass>"RP6DEN"</pass>
                    <cns>4040</cns>
                </selo:emolumentoTransmissao>
            </soapenv:Body>
        </soapenv:Envelope> 
        `;

            const response = await axios.post(

                ApiService.webservice,
                soapEnvelope,
                {
                    headers: {
                        'Content-Type': 'text/xml;charset=UTF-8',
                        'SOAPAction': '',
                    },
                }
            );

            const data = xmlToJson(response.data)

            return response.data;

    }

    async DescontoTransmissao(user, pass, nuLote, statusSelo) {
        const soapEnvelope = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:selo="http://www.tjal.jus.br/selo">
            <soapenv:Header/>
            <soapenv:Body>
                <selo:consultarSelosPorLote>
                    <user>${user}</user>
                    <pass>${pass}</pass>
                    <nuLote>${nuLote}</nuLote>
                    <statusSelo>${statusSelo}</statusSelo>

                </selo:consultarSelosPorLote>
            </soapenv:Body>
        </soapenv:Envelope> 
        `;
            return soapEnvelope
            const response = await axios.post(

                ApiService.webservice,
                soapEnvelope,
                {
                    headers: {
                        'Content-Type': 'text/xml;charset=UTF-8',
                        'SOAPAction': '',
                    },
                }
            );

            // const data = xmlToJson(response.data)

            return response.data;

    }



    
    async registroTitulosDocPJ(user, pass, xmlData) {
        // const arquivoPath = "/home/ewerto/Documentos/Projetos/cartorio360-web-service/src/XML/temp.xml";
        // const arquivoPath = "/media/pwdev/Novo volume/cartorio360-web-service/src/XML/temp.xml";

        const boundary = "MIME_BOUNDARY";
        const fileCid = "arquivo-binario"; // CID que será referenciado no XML
        const xmlString = setAto(xmlData);
        fs.writeFileSync(arquivoPath, xmlString);


        const fileStream = fs.readFileSync(arquivoPath);
        const fileName = path.basename(arquivoPath);
        // 1️⃣ Construção do envelope SOAP como uma string normal (sem Buffer)
        const soapEnvelope = `--${boundary}\r\n` +
            `Content-Type: application/xop+xml; charset=UTF-8; type="text/xml"\r\n` +
            `Content-Transfer-Encoding: 8bit\r\n` +
            `Content-ID: <soapMessage>\r\n\r\n` +
            `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                              xmlns:selo="http://www.tjal.jus.br/selo"
                              xmlns:xop="http://www.w3.org/2004/08/xop/include">
                <soapenv:Header/>
                <soapenv:Body>
                    <selo:enviarAtos>
                        <user>${user}</user>
                        <pass>${pass}</pass>
                        <arquivo>
                            <xop:Include href="cid:${fileCid}"/> 
                        </arquivo>
                    </selo:enviarAtos>
                </soapenv:Body>
            </soapenv:Envelope>\r\n`;
    
        // 2️⃣ Construção dos cabeçalhos do arquivo
        const fileHeader = `--${boundary}\r\n` +
            `Content-Type: application/xml\r\n` +
            `Content-Transfer-Encoding: binary\r\n` +
            `Content-ID: <${fileCid}>\r\n` +
            `Content-Disposition: attachment; name="${fileName}"; filename="${fileName}"\r\n\r\n`;
    
        // 3️⃣ Construção do corpo final, sem transformar tudo em Buffer
        const requestBody = soapEnvelope + fileHeader; // Parte textual  
        const bodyBuffer = Buffer.concat([
            Buffer.from(requestBody, "utf-8"), // Texto como UTF-8  
            fileStream, // Arquivo binário
            Buffer.from(`\r\n--${boundary}--\r\n`, "utf-8") // Fechamento do MIME  
        ]);
            // 4️⃣ Envio da requisição SOAP  
            const response = await axios.post(
                ApiService.webservice,
                    bodyBuffer,
                {
                    headers: {
                        "Content-Type": `multipart/related; type="application/xop+xml"; boundary="${boundary}"`,
                        "SOAPAction": ""
                    },
                }
            );
            return response.data
    
    }

    async registroImoveis(user, pass, xmlData) {
        // const arquivoPath = "/home/ewerto/Documentos/Projetos/cartorio360-web-service/src/XML/temp.xml";
        // const arquivoPath = "/media/pwdev/Novo volume/cartorio360-web-service/src/XML/temp.xml";

        const boundary = "MIME_BOUNDARY";
        const fileCid = "arquivo-binario"; // CID que será referenciado no XML
        const xmlString = SetRegistroImovel(xmlData);
        fs.writeFileSync(arquivoPath, xmlString);


        const fileStream = fs.readFileSync(arquivoPath);
        const fileName = path.basename(arquivoPath);
        // 1️⃣ Construção do envelope SOAP como uma string normal (sem Buffer)
        const soapEnvelope = `--${boundary}\r\n` +
            `Content-Type: application/xop+xml; charset=UTF-8; type="text/xml"\r\n` +
            `Content-Transfer-Encoding: 8bit\r\n` +
            `Content-ID: <soapMessage>\r\n\r\n` +
            `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                              xmlns:selo="http://www.tjal.jus.br/selo"
                              xmlns:xop="http://www.w3.org/2004/08/xop/include">
                <soapenv:Header/>
                <soapenv:Body>
                    <selo:enviarAtos>
                        <user>${user}</user>
                        <pass>${pass}</pass>
                        <arquivo>
                            <xop:Include href="cid:${fileCid}"/> 
                        </arquivo>
                    </selo:enviarAtos>
                </soapenv:Body>
            </soapenv:Envelope>\r\n`;
    
        // 2️⃣ Construção dos cabeçalhos do arquivo
        const fileHeader = `--${boundary}\r\n` +
            `Content-Type: application/xml\r\n` +
            `Content-Transfer-Encoding: binary\r\n` +
            `Content-ID: <${fileCid}>\r\n` +
            `Content-Disposition: attachment; name="${fileName}"; filename="${fileName}"\r\n\r\n`;
    
        // 3️⃣ Construção do corpo final, sem transformar tudo em Buffer
        const requestBody = soapEnvelope + fileHeader; // Parte textual  
        const bodyBuffer = Buffer.concat([
            Buffer.from(requestBody, "utf-8"), // Texto como UTF-8  
            fileStream, // Arquivo binário
            Buffer.from(`\r\n--${boundary}--\r\n`, "utf-8") // Fechamento do MIME  
        ]);
            // 4️⃣ Envio da requisição SOAP  
            const response = await axios.post(
                ApiService.webservice,
                bodyBuffer,
                {
                    headers: {
                        "Content-Type": `multipart/related; type="application/xop+xml"; boundary="${boundary}"`,
                        "SOAPAction": ""
                    },
                }
            );
            return response.data
    

    }
    async nascimento(user, pass, xmlData) {
        // const arquivoPath = "/home/ewerto/Documentos/Projetos/cartorio360-web-service/src/XML/temp.xml";
        // const arquivoPath = "/media/pwdev/Novo volume/cartorio360-web-service/src/XML/temp.xml";

        const boundary = "MIME_BOUNDARY";
        const fileCid = "arquivo-binario"; // CID que será referenciado no XML
        const xmlString = SetNascimento(xmlData);
        fs.writeFileSync(arquivoPath, xmlString);


        const fileStream = fs.readFileSync(arquivoPath);
        const fileName = path.basename(arquivoPath);
        // 1️⃣ Construção do envelope SOAP como uma string normal (sem Buffer)
        const soapEnvelope = `--${boundary}\r\n` +
            `Content-Type: application/xop+xml; charset=UTF-8; type="text/xml"\r\n` +
            `Content-Transfer-Encoding: 8bit\r\n` +
            `Content-ID: <soapMessage>\r\n\r\n` +
            `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                              xmlns:selo="http://www.tjal.jus.br/selo"
                              xmlns:xop="http://www.w3.org/2004/08/xop/include">
                <soapenv:Header/>
                <soapenv:Body>
                    <selo:enviarAtos>
                        <user>${user}</user>
                        <pass>${pass}</pass>
                        <arquivo>
                            <xop:Include href="cid:${fileCid}"/> 
                        </arquivo>
                    </selo:enviarAtos>
                </soapenv:Body>
            </soapenv:Envelope>\r\n`;
    
        // 2️⃣ Construção dos cabeçalhos do arquivo
        const fileHeader = `--${boundary}\r\n` +
            `Content-Type: application/xml\r\n` +
            `Content-Transfer-Encoding: binary\r\n` +
            `Content-ID: <${fileCid}>\r\n` +
            `Content-Disposition: attachment; name="${fileName}"; filename="${fileName}"\r\n\r\n`;
    
        // 3️⃣ Construção do corpo final, sem transformar tudo em Buffer
        const requestBody = soapEnvelope + fileHeader; // Parte textual  
        const bodyBuffer = Buffer.concat([
            Buffer.from(requestBody, "utf-8"), // Texto como UTF-8  
            fileStream, // Arquivo binário
            Buffer.from(`\r\n--${boundary}--\r\n`, "utf-8") // Fechamento do MIME  
        ]);
            // 4️⃣ Envio da requisição SOAP  
            const response = await axios.post(
                ApiService.webservice,
                bodyBuffer,
                {
                    headers: {
                        "Content-Type": `multipart/related; type="application/xop+xml"; boundary="${boundary}"`,
                        "SOAPAction": ""
                    },
                }
            );
            return response.data
    
        
    }

    async notaGenerica(user, pass, xmlData) {
        // const arquivoPath = "/home/ewerto/Documentos/Projetos/cartorio360-web-service/src/XML/temp.xml";
        // const arquivoPath = "/media/pwdev/Novo volume/cartorio360-web-service/src/XML/temp.xml";

        const boundary = "MIME_BOUNDARY";
        const fileCid = "arquivo-binario"; // CID que será referenciado no XML
        const xmlString = SetNotaGenerica(xmlData);
        fs.writeFileSync(arquivoPath, xmlString);


        const fileStream = fs.readFileSync(arquivoPath);
        const fileName = path.basename(arquivoPath);
        // 1️⃣ Construção do envelope SOAP como uma string normal (sem Buffer)
        const soapEnvelope = `--${boundary}\r\n` +
            `Content-Type: application/xop+xml; charset=UTF-8; type="text/xml"\r\n` +
            `Content-Transfer-Encoding: 8bit\r\n` +
            `Content-ID: <soapMessage>\r\n\r\n` +
            `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                              xmlns:selo="http://www.tjal.jus.br/selo"
                              xmlns:xop="http://www.w3.org/2004/08/xop/include">
                <soapenv:Header/>
                <soapenv:Body>
                    <selo:enviarAtos>
                        <user>${user}</user>
                        <pass>${pass}</pass>
                        <arquivo>
                            <xop:Include href="cid:${fileCid}"/> 
                        </arquivo>
                    </selo:enviarAtos>
                </soapenv:Body>
            </soapenv:Envelope>\r\n`;
    
        // 2️⃣ Construção dos cabeçalhos do arquivo
        const fileHeader = `--${boundary}\r\n` +
            `Content-Type: application/xml\r\n` +
            `Content-Transfer-Encoding: binary\r\n` +
            `Content-ID: <${fileCid}>\r\n` +
            `Content-Disposition: attachment; name="${fileName}"; filename="${fileName}"\r\n\r\n`;
    
        // 3️⃣ Construção do corpo final, sem transformar tudo em Buffer
        const requestBody = soapEnvelope + fileHeader; // Parte textual  
        const bodyBuffer = Buffer.concat([
            Buffer.from(requestBody, "utf-8"), // Texto como UTF-8  
            fileStream, // Arquivo binário
            Buffer.from(`\r\n--${boundary}--\r\n`, "utf-8") // Fechamento do MIME  
        ]);
            // 4️⃣ Envio da requisição SOAP  
            const response = await axios.post(
                ApiService.webservice,
                bodyBuffer,
                {
                    headers: {
                        "Content-Type": `multipart/related; type="application/xop+xml"; boundary="${boundary}"`,
                        "SOAPAction": ""
                    },
                }
            );
            return response.data
    

    }
    
    async protestoGenerico(user, pass, xmlData) {
        // const arquivoPath = "/home/ewerto/Documentos/Projetos/cartorio360-web-service/src/XML/temp.xml";
        // const arquivoPath = "/media/pwdev/Novo volume/cartorio360-web-service/src/XML/temp.xml";

        const boundary = "MIME_BOUNDARY";
        const fileCid = "arquivo-binario"; // CID que será referenciado no XML
        console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$\n',xmlData);

        const xmlString = SetProtestoGenerico(xmlData);
        fs.writeFileSync(arquivoPath, xmlString);


        const fileStream = fs.readFileSync(arquivoPath);
        const fileName = path.basename(arquivoPath);
        // 1️⃣ Construção do envelope SOAP como uma string normal (sem Buffer)
        const soapEnvelope = `--${boundary}\r\n` +
            `Content-Type: application/xop+xml; charset=UTF-8; type="text/xml"\r\n` +
            `Content-Transfer-Encoding: 8bit\r\n` +
            `Content-ID: <soapMessage>\r\n\r\n` +
            `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                              xmlns:selo="http://www.tjal.jus.br/selo"
                              xmlns:xop="http://www.w3.org/2004/08/xop/include">
                <soapenv:Header/>
                <soapenv:Body>
                    <selo:enviarAtos>
                        <user>${user}</user>
                        <pass>${pass}</pass>
                        <arquivo>
                            <xop:Include href="cid:${fileCid}"/> 
                        </arquivo>
                    </selo:enviarAtos>
                </soapenv:Body>
            </soapenv:Envelope>\r\n`;
    
        // 2️⃣ Construção dos cabeçalhos do arquivo
        const fileHeader = `--${boundary}\r\n` +
            `Content-Type: application/xml\r\n` +
            `Content-Transfer-Encoding: binary\r\n` +
            `Content-ID: <${fileCid}>\r\n` +
            `Content-Disposition: attachment; name="${fileName}"; filename="${fileName}"\r\n\r\n`;
    
        // 3️⃣ Construção do corpo final, sem transformar tudo em Buffer
        const requestBody = soapEnvelope + fileHeader; // Parte textual  
        const bodyBuffer = Buffer.concat([
            Buffer.from(requestBody, "utf-8"), // Texto como UTF-8  
            fileStream, // Arquivo binário
            Buffer.from(`\r\n--${boundary}--\r\n`, "utf-8") // Fechamento do MIME  
        ]);
            // 4️⃣ Envio da requisição SOAP  
            const response = await axios.post(
                ApiService.webservice,
                bodyBuffer,
                {
                    headers: {
                        "Content-Type": `multipart/related; type="application/xop+xml"; boundary="${boundary}"`,
                        "SOAPAction": ""
                    },
                }
            );
            return response.data
    

    }
    async notaEscrituraria(user, pass, xmlData) {
        // const arquivoPath = "/home/ewerto/Documentos/Projetos/cartorio360-web-service/src/XML/temp.xml";
        // const arquivoPath = "/media/pwdev/Novo volume/cartorio360-web-service/src/XML/temp.xml";

        const boundary = "MIME_BOUNDARY";
        const fileCid = "arquivo-binario"; // CID que será referenciado no XML
        const xmlString = SetNotasEscrituratias(xmlData);
        fs.writeFileSync(arquivoPath, xmlString);


        const fileStream = fs.readFileSync(arquivoPath);
        const fileName = path.basename(arquivoPath);
        // 1️⃣ Construção do envelope SOAP como uma string normal (sem Buffer)
        const soapEnvelope = `--${boundary}\r\n` +
            `Content-Type: application/xop+xml; charset=UTF-8; type="text/xml"\r\n` +
            `Content-Transfer-Encoding: 8bit\r\n` +
            `Content-ID: <soapMessage>\r\n\r\n` +
            `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                              xmlns:selo="http://www.tjal.jus.br/selo"
                              xmlns:xop="http://www.w3.org/2004/08/xop/include">
                <soapenv:Header/>
                <soapenv:Body>
                    <selo:enviarAtos>
                        <user>${user}</user>
                        <pass>${pass}</pass>
                        <arquivo>
                            <xop:Include href="cid:${fileCid}"/> 
                        </arquivo>
                    </selo:enviarAtos>
                </soapenv:Body>
            </soapenv:Envelope>\r\n`;
    
        // 2️⃣ Construção dos cabeçalhos do arquivo
        const fileHeader = `--${boundary}\r\n` +
            `Content-Type: application/xml\r\n` +
            `Content-Transfer-Encoding: binary\r\n` +
            `Content-ID: <${fileCid}>\r\n` +
            `Content-Disposition: attachment; name="${fileName}"; filename="${fileName}"\r\n\r\n`;
    
        // 3️⃣ Construção do corpo final, sem transformar tudo em Buffer
        const requestBody = soapEnvelope + fileHeader; // Parte textual  
        const bodyBuffer = Buffer.concat([
            Buffer.from(requestBody, "utf-8"), // Texto como UTF-8  
            fileStream, // Arquivo binário
            Buffer.from(`\r\n--${boundary}--\r\n`, "utf-8") // Fechamento do MIME  
        ]);
            // 4️⃣ Envio da requisição SOAP  
            const response = await axios.post(
                ApiService.webservice,
                bodyBuffer,
                {
                    headers: {
                        "Content-Type": `multipart/related; type="application/xop+xml"; boundary="${boundary}"`,
                        "SOAPAction": ""
                    },
                }
            );
            return response.data
    

    }
    async ReconhecimentoFirma(user, pass, xmlData) {
        const arquivoPath = "/home/ewerto/Documentos/Projetos/cartorio360-web-service/src/XML/temp.xml";
        // const arquivoPath = "/media/pwdev/Novo volume/cartorio360-web-service/src/XML/temp.xml";
        const boundary = "MIME_BOUNDARY";
        const fileCid = "arquivo-binario"; // CID que será referenciado no XML
        const xmlString = SetReconhecimentoFirma(xmlData);
        fs.writeFileSync(arquivoPath, xmlString);


        const fileStream = fs.readFileSync(arquivoPath);
        const fileName = path.basename(arquivoPath);
        // 1️⃣ Construção do envelope SOAP como uma string normal (sem Buffer)
        const soapEnvelope = `--${boundary}\r\n` +
            `Content-Type: application/xop+xml; charset=UTF-8; type="text/xml"\r\n` +
            `Content-Transfer-Encoding: 8bit\r\n` +
            `Content-ID: <soapMessage>\r\n\r\n` +
            `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                              xmlns:selo="http://www.tjal.jus.br/selo"
                              xmlns:xop="http://www.w3.org/2004/08/xop/include">
                <soapenv:Header/>
                <soapenv:Body>
                    <selo:enviarAtosMultiplo>
                        <user>${user}</user>
                        <pass>${pass}</pass>
                        <arquivo>
                            <xop:Include href="cid:${fileCid}"/> 
                        </arquivo>
                    </selo:enviarAtosMultiplo>
                </soapenv:Body>
            </soapenv:Envelope>\r\n`;
    
        // 2️⃣ Construção dos cabeçalhos do arquivo
        const fileHeader = `--${boundary}\r\n` +
            `Content-Type: application/xml\r\n` +
            `Content-Transfer-Encoding: binary\r\n` +
            `Content-ID: <${fileCid}>\r\n` +
            `Content-Disposition: attachment; name="${fileName}"; filename="${fileName}"\r\n\r\n`;
    
        // 3️⃣ Construção do corpo final, sem transformar tudo em Buffer
        const requestBody = soapEnvelope + fileHeader; // Parte textual  
        const bodyBuffer = Buffer.concat([
            Buffer.from(requestBody, "utf-8"), // Texto como UTF-8  
            fileStream, // Arquivo binário
            Buffer.from(`\r\n--${boundary}--\r\n`, "utf-8") // Fechamento do MIME  
        ]);
            // 4️⃣ Envio da requisição SOAP  
            const response = await axios.post(
                ApiService.webservice,
                bodyBuffer,
                {
                    headers: {
                        "Content-Type": `multipart/related; type="application/xop+xml"; boundary="${boundary}"`,
                        "SOAPAction": ""
                    },
                }
            );
            return response.data
    

    }

 
    async consultarDescontoTransmissao() {
        // Cria o envelope SOAP sem os campos usuario e senha
        const soapEnvelope = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://www.tjal.jus.br/selo">  
            <soapenv:Header/>  
            <soapenv:Body>  
                <tns:descontoTransmissao>  
                    <!-- Campos opcionais omitidos -->
                </tns:descontoTransmissao>  
            </soapenv:Body>  
        </soapenv:Envelope> 
        `;

        return soapEnvelope
    
    }


}

module.exports = {
    ApiService
}