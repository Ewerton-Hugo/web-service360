const axios = require('axios');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const FormData = require('form-data');
const {setAto} = require('../providers/SetAto')
const {SetReconhecimentoFirma} = require('../providers/SetReconhecimentoFirma')

const {xmlToJson, jsonToXml} = require('../providers/XmlToJson')

class ApiService {

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

                'https://hmlselows02.tjal.jus.br/SeloCore/SeloService',
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

                'https://hmlselows02.tjal.jus.br/SeloCore/SeloService',
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

                'https://hmlselows02.tjal.jus.br/SeloCore/SeloService',
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

                'https://hmlselows02.tjal.jus.br/SeloCore/SeloService',
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

                'https://hmlselows02.tjal.jus.br/SeloCore/SeloService',
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



    

    async enviarAtos(user, pass, xmlData) {
        const arquivoPath = "/home/ewerto/Documentos/Projetos/cartorio360-web-service/src/XML/temp.xml";
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
        try {
            // 4️⃣ Envio da requisição SOAP  
            const response = await axios.post(
                "https://hmlselows02.tjal.jus.br/SeloCore/SeloService",
                bodyBuffer,
                {
                    headers: {
                        "Content-Type": `multipart/related; type="application/xop+xml"; boundary="${boundary}"`,
                        "SOAPAction": ""
                    },
                }
            );
            return response.data
    
        } catch (error) {
            console.error(
                "Erro na requisição:",
                error.response ? error.response.data : error.message
            );
            throw error;
        }
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
        try {
            // 4️⃣ Envio da requisição SOAP  
            const response = await axios.post(
                "https://hmlselows02.tjal.jus.br/SeloCore/SeloService",
                bodyBuffer,
                {
                    headers: {
                        "Content-Type": `multipart/related; type="application/xop+xml"; boundary="${boundary}"`,
                        "SOAPAction": ""
                    },
                }
            );
            return response.data
    
        } catch (error) {
            console.error(
                "Erro na requisição:",
                error.response ? error.response.data : error.message
            );
            throw error;
        }
    }
    // Chamar a função para testar
    // enviarAtos("usuario", "senha", "caminho/do/arquivo.xml");
    
    
    
    
    // async enviarAtos(user, pass, arquivoPath) {
    //     arquivoPath = "/home/ewerto/Documentos/Projetos/cartorio360-web-service/src/XML/ExemploATO.xml";
    //     const fileStream = fs.readFileSync(arquivoPath);
    //     const fileName = arquivoPath.split("/").pop();
    
    //     const boundary = "MIME_BOUNDARY";
        
    //     // Ajuste da referência CID
    //     const fileCid = "arquivo-binario"; // CID que será referenciado no XML
        
    //     // Envelope SOAP correto com cabeçalhos de separação bem formatados
    //     const soapEnvelope = 
    // `--${boundary}
    // Content-Type: multipart/related; charset=UTF-8; type="application/xop+xml"
    // Content-Transfer-Encoding: 8bit
    // Content-ID: <soapMessage>
    
    // <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    //                   xmlns:selo="http://www.tjal.jus.br/selo"
    //                   xmlns:xop="http://www.w3.org/2004/08/xop/include">
    //     <soapenv:Header/>
    //     <soapenv:Body>
    //         <selo:enviarAtos>
    //             <user>${user}</user>
    //             <pass>${pass}</pass>
    //             <arquivo>
    //                 <xop:Include href="cid:${fileCid}"/> <!-- Referência CID correta -->
    //             </arquivo>
    //         </selo:enviarAtos>
    //     </soapenv:Body>
    // </soapenv:Envelope>
    

    
    // `;
    
    //     // Criar buffer do corpo da requisição
    //     // const requestBody = Buffer.concat([
    //     //     Buffer.from(soapEnvelope, "utf-8"),
    //     //     fileStream, // Conteúdo do arquivo
    //     //     Buffer.from(`\r\n--${boundary}--\r\n`, "utf-8") // Finaliza o MIME
    //     // ]);
    
    //     try {
    //         // Envio da requisição
    //         const response = await axios.post(
    //             "https://hmlselows02.tjal.jus.br/SeloCore/SeloService",
    //             requestBody,
    //             {
    //                 headers: {
    //                     "Content-Type": `multipart/related; type="application/xop+xml"; boundary="${boundary}"`,
    //                     "SOAPAction": "",
    //                 },
    //             }
    //         );
    
    //         console.log("Resposta SOAP:", response.data);
    //         return response.data;
    //     } catch (error) {
    //         console.error(
    //             "Erro na requisição:",
    //             error.response ? error.response.data : error.message
    //         );
    //         throw error;
    //     }
    // }
    
    
    

// async  enviarAtos(user, pass, arquivoPath) {
//     const form = new FormData();
    
//     const fileStream = fs.createReadStream(arquivoPath);
    
//     const fileName = arquivoPath.split('/').pop();

//     const soapEnvelope = `
//         <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
//                           xmlns:selo="http://www.tjal.jus.br/selo"
//                           xmlns:xop="http://www.w3.org/2004/08/xop/include">
//             <soapenv:Header/>
//             <soapenv:Body>
//                 <selo:enviarAtos>
//                     <user>${user}</user>
//                     <pass>${pass}</pass>
//                     <arquivo>
//                         <xop:Include href="cid:arquivo-binario"/>
//                     </arquivo>
//                 </selo:enviarAtos>
//             </soapenv:Body>
//         </soapenv:Envelope>
//     `;

//     form.append("soapMessage", Buffer.from(soapEnvelope), {
//         contentType: "application/xop+xml; charset=UTF-8; type=\"text/xml\"",
//     });

//     form.append("arquivo-binario", fileStream, {
//         filename: fileName,
//         contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     });

//         const response = await axios.post(
//             'https://hmlselows02.tjal.jus.br/SeloCore/SeloService',
//             form,
//             {
//                 headers: {
//                     ...form.getHeaders(),
//                     'Content-Type': 'multipart/related; type="application/xop+xml"; start="soapMessage"',
//                     'SOAPAction': '',
//                 },
//             }
//         );

//         const data = xmlToJson(response.data)

//         return data;

// }

 
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