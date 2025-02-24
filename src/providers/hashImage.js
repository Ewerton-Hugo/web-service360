const fs = require('fs');

function imagemParaBase64(caminhoDaImagem) {
  // Lê o arquivo como um Buffer
  const imagemBuffer = fs.readFileSync(caminhoDaImagem);
  // Converte o Buffer em uma string Base64
  const imagemBase64 = imagemBuffer.toString('base64');
  return imagemBase64;
}

module.exports = {
  imagemParaBase64,
};