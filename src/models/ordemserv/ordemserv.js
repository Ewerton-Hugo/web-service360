const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelizeConf'); // ajuste o caminho conforme necessário

const OrdemServ = sequelize.define('OrdemServ', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cartorio_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Cartorios', // Nome do modelo relacionado
      key: 'id',
    },
  },
  apresentante_nome: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  apresentante_cpf: {
    type: DataTypes.STRING(14),
    allowNull: false,
  },

  valor: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true,
  },
  status: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: 'PENDENTE',
  },
  observacao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  dt_cancelamento: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  dt_pagto: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  vlr_pago: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true,
  },
  motivo_cancelamento: {
    type: DataTypes.TEXT,
    allowNull: true,
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
      model: 'Users', // Nome do modelo relacionado
      key: 'id',
    },
  },
  user_alteracao_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Users', // Nome do modelo relacionado
      key: 'id',
    },
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: true,
    unique: true, // Índice único para token
  },
  numero: {
    type: DataTypes.BIGINT,
    // allowNull: false,
  },
  estrangeiro: {
    type: DataTypes.BOOLEAN,
  },
}, {
  tableName: 'ordemserv',
  timestamps: false,
});

// OrdemServ.belongsTo(sequelize.models.Cartorios, {
//   foreignKey: 'cartorio_id',
//   as: 'cartorio',
//   targetKey: 'id',
// });

// OrdemServ.belongsTo(sequelize.models.Users, {
//   foreignKey: 'user_id',
//   as: 'usuario',
//   targetKey: 'id',
// });

// OrdemServ.belongsTo(sequelize.models.Users, {
//   foreignKey: 'user_alteracao_id',
//   as: 'usuario_alteracao',
//   targetKey: 'id',
// });

module.exports = { OrdemServ };
