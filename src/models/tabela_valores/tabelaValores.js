const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../config/sequelizeConf');

const TabelasValores = sequelize.define('TabelasValores', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tabela_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tabelas',
      key: 'id',
    },
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false,
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
  token: {
    type: DataTypes.TEXT,
    allowNull: true,
    unique: true,
  },
  url_imagem: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  detalhe: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  ordem: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  }
}, {
  tableName: 'tabelas_valores',
  timestamps: false,
});

module.exports = { TabelasValores };
