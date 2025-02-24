const request = require('supertest');
const app = require('../app'); // Importa o app da sua aplicação

describe('GET /listarEstadoCivil', () => {
  it('deve retornar status 200 e a lista de estados civis', async () => {
    const response = await request(app).get('/listarEstadoCivil');
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      { "id": 26, "descricao": "CASADO", "token": "5ZUEN" },
      { "id": 28, "descricao": "DIVORCIADO", "token": "fRVZY" },
      { "id": 30, "descricao": "SEPARADO JUDICIALMENTE", "token": "Dx54k" },
      { "id": 7, "descricao": "SOLTEIRO", "token": "21gfA" },
      { "id": 45, "descricao": "VIUVO", "token": "fy2pT" }
    ]);
  });
});
