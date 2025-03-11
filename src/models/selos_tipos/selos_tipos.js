const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelizeConf'); // ajuste o caminho conforme necessário

const SelosTipos = sequelize.define('SelosTipos', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  uf: {
    type: DataTypes.STRING(2),
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  vlr_compra: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
  },
  vlr_venda: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: true,
  },
  excluido: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  created: {
    type: DataTypes.DATE,
    allowNull: true,
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
    allowNull: false,
    references: {
        model: 'users',
        key: 'id',
    },
},
  token: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  cor: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: false,
  },
  qtd_estoque: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  qtd_reservada: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
}, {
  tableName: 'selos_tipos',
  modelName: 'SelosTipos',
  timestamps: false,
});

module.exports = {SelosTipos};
