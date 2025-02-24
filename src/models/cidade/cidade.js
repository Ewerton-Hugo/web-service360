const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelizeConf'); // ajuste o caminho conforme necessário

const Cidades = sequelize.define('Cidades', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  uf: {
    type: DataTypes.STRING(2),
    allowNull: true,
  },
  fuso_horario: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  excluido: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  created: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  fone_chat_clientes: {
    type: DataTypes.STRING(14),
    allowNull: true,
  },
  operador_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  uf_descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  cod_cep: {
    type: DataTypes.STRING(8),
    allowNull: true,
  }
}, {
  tableName: 'cidades',
  modelName: 'cidades',
  timestamps: false,
});

module.exports = {Cidades};
