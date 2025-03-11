// models/PessoasDocs.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelizeConf');
const {Pessoa} = require('../pessoa/pessoa'); // ajuste o caminho conforme necessário
const {PartesTipos} = require('../partes_tipos/partes_tipos'); // ajuste o caminho conforme necessário
const {TabelasValores} = require('../tabela_valores/tabelaValores'); // ajuste o caminho conforme necessário
// const Users = require('./Users'); // ajuste o caminho conforme necessário

const PessoasRepresentantes = sequelize.define('PessoasRepresentantes', {
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
  
  representante_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'pessoas',
      key: 'id',
    },
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

  papel_id: {
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
  
}, {
  tableName: 'pessoas_representantes',
  timestamps: false,
});

// Definindo as associações
PessoasRepresentantes.belongsTo(Pessoa, { foreignKey: 'pessoa_id', as: 'pessoa', targetKey: 'id' });
PessoasRepresentantes.belongsTo(Pessoa, { foreignKey: 'representante_id', as: 'representante', targetKey: 'id' });
PessoasRepresentantes.belongsTo(PartesTipos, { foreignKey: 'papel_id', as: 'papel', targetKey: 'id' });
module.exports = {PessoasRepresentantes};
