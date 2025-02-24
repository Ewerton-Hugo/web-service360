const xml2js = require('xml2js');

async function xmlToJson(xml) {
  const parser = new xml2js.Parser({ explicitArray: false });
  
  try {
      const result = await parser.parseStringPromise(xml);

      
      return result;
  } catch (error) {
      console.error("Erro ao converter XML para JSON:", error);
      return null;
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

module.exports = {
  xmlToJson,
  jsonToXml,
  extractMultipartData
};