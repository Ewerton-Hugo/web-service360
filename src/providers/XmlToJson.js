const xml2js = require('xml2js');
const { XMLParser } = require('fast-xml-parser');
const { DOMParser } = require('xmldom');
async function xmlToJson(xmlString,tagName = null ) {
    if(tagName){
        console.log('tagName',tagName)
        const data = extrairMEnsagemSimples(xmlString,tagName)
        console.log('data',data)
        const parser = new xml2js.Parser({ explicitArray: false });
  
        const result = await parser.parseStringPromise(data);
        return result;

    }
    else{ 
        const parser = new xml2js.Parser({ explicitArray: false });
  
        const result = await parser.parseStringPromise(xmlString);
        return result;
    }


    

}

async function jsonToXml(json) {
  
  try {
    const builder = new xml2js.Builder();

    const result = builder.buildObject(json);

      
      return result;
  } catch (error) {
      console.error("Erro ao converter XML para JSON:", error);
      return null;
  }
}

function extractMultipartData(responseData) {
  const boundary = extractBoundaryFromResponse(responseData);
  // Passo 1: Dividir o retorno multipart usando o boundary
  const parts = responseData.split(boundary);

  // Definir um objeto para armazenar os dados extraídos
  const result = {};

  // Passo 2: Encontrar e extrair o CID da primeira parte (geralmente é o SOAP Response)
  const soapPart = parts.find(part => part.includes("<xop:Include"));
  if (soapPart) {
      const cidMatch = soapPart.match(/href="cid:([^"]+)"/);
      result.cid = cidMatch ? cidMatch[1] : null;
  }

  // Passo 3: Extrair os dados XML da segunda parte (normalmente o XML do protocolo)
  const protocolPart = parts.find(part => part.includes("<documentoProtocolo"));
  if (protocolPart) {
      const protocolXml = protocolPart.trim(); // Remover espaços extras

      // Passo 4: Converter o XML para JSON
      return new Promise((resolve, reject) => {
          xml2js.parseString(protocolXml, (err, parsedXml) => {
              if (err) {
                  reject('Erro ao converter XML para JSON: ' + err);
              } else {
                  // Passo 5: Extrair os dados de forma dinâmica
                  if (parsedXml && parsedXml.documentoProtocolo) {
                      const protocolData = parsedXml.documentoProtocolo;

                      // Passo 6: Adicionar as informações ao resultado final
                      Object.keys(protocolData).forEach(key => {
                          result[key] = protocolData[key][0]; // Adiciona cada campo do XML ao objeto de resultado
                      });

                      resolve(result);
                  } else {
                      reject('XML do protocolo não encontrado.');
                  }
              }
          });
      });
  } else {
      return Promise.reject('Parte do protocolo não encontrada.');
  }
}

function extractBoundaryFromResponse(response) {
  // Obtém o cabeçalho 'Content-Type' da resposta
  const contentType = response.headers['content-type'];
  
  // Usa uma expressão regular para extrair o boundary
  const boundaryMatch = contentType.match(/boundary="([^"]+)"/);
  
  // Retorna o boundary, ou null se não encontrar
  return boundaryMatch ? boundaryMatch[1] : null;
}


function extrairSelos(xmlString) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

    const selosNodeList = xmlDoc.getElementsByTagName('selo');
    const selosArray = [];

    for (let i = 0; i < selosNodeList.length; i++) {
        const selo = selosNodeList[i];
        
        const tipoSelo = selo.getElementsByTagName('tipoSelo')[0]?.textContent || '';
        const numeroSerie = selo.getElementsByTagName('numeroSerie')[0]?.textContent || '';
        const validador = selo.getElementsByTagName('validador')[0]?.textContent || '';
        const nuCartorio = selo.getElementsByTagName('nuCartorio')[0]?.textContent || '';

        selosArray.push({
            tipoSelo,
            numeroSerie,
            validador,
            nuCartorio
        });
    }

    return { selos: selosArray };
}

function    extrairMEnsagemSimples(xmlString,tagName) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

    const selosNodeList = xmlDoc.getElementsByTagName(tagName);

    return selosNodeList[0].textContent;
  
}


async function extrairMensageSucesso(xmlString) {
    // Sua string XML

    // 1. Separar as partes do Multipart
    const partes = xmlString.split("--uuid:b0bfcd80-7015-4a9b-9777-d41507579bf7");
    const documentoProtocoloParte = partes.find(parte => parte.includes("<documentoProtocolo>"));

    if (!documentoProtocoloParte) {
        console.error("documentoProtocolo não encontrado.");
        return null; // Retorna null caso não encontre o XML do documentoProtocolo
    }

    // 2. Remover cabeçalhos desnecessários e pegar só o XML do documentoProtocolo
    const xmlMatch = documentoProtocoloParte.match(/<documentoProtocolo[\s\S]*<\/documentoProtocolo>/);
    if (!xmlMatch) {
        console.error("XML do documentoProtocolo não encontrado.");
        return null; // Retorna null caso o XML não seja encontrado
    }

    const xmlDocumentoProtocolo = xmlMatch[0];

    // 3. Converter XML para JSON de forma assíncrona usando Promise
    const options = {
        explicitArray: false, // Evita arrays para elementos únicos
        ignoreAttrs: false, // Mantém os atributos no XML
        mergeAttrs: true // Mescla atributos em elementos
    };

    return new Promise((resolve, reject) => {
        xml2js.parseString(xmlDocumentoProtocolo, options, (err, result) => {
            if (err) {
                console.error("Erro ao converter XML para JSON:", err);
                reject("Erro ao converter XML para JSON");
            } else {
                resolve(result.documentoProtocolo); // Resolve a promise com o resultado
            }
        });
    });
}



module.exports = {
  xmlToJson,
  jsonToXml,
  extractMultipartData,
  extrairSelos,
  extrairMEnsagemSimples,
  extrairMensageSucesso
};