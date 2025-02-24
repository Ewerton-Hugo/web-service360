// models/PessoasDocs.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelizeConf');
const {Pessoa} = require('../pessoa/pessoa'); // ajuste o caminho conforme necessário
const {TabelasValores} = require('../tabela_valores/tabelaValores'); // ajuste o caminho conforme necessário
// const Users = require('./Users'); // ajuste o caminho conforme necessário

const PessoasDocs = sequelize.define('PessoasDocs', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  pessoa_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'pessoas',
      key: 'id',
    },
  },
  tabvalores_tipodoc_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tabelas_valores',
      key: 'id',
    },
  },
  numero: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  emissor: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  data_emissao: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  excluido: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  created: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  user_alteracao_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: true,
    unique: true,
  },
  tabvalores_ufemissor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tabelas_valores',
      key: 'id',
    },
  },
  data_vencimento: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  tableName: 'pessoas_docs',
  timestamps: false,
});

// Definindo as associações
PessoasDocs.belongsTo(Pessoa, { foreignKey: 'pessoa_id', as: 'pessoa', targetKey: 'id' });
PessoasDocs.belongsTo(TabelasValores, { foreignKey: 'tabvalores_tipodoc_id', as: 'tipoDocumento' });
PessoasDocs.belongsTo(TabelasValores, { foreignKey: 'tabvalores_ufemissor_id', as: 'ufEmissor' });
module.exports = {PessoasDocs};
