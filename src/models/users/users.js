const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelizeConf');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
    },

    token: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize, // a instância do Sequelize deve ser passada aqui
    modelName: 'User',
    tableName: 'users',
    timestamps: false, // se não há colunas `createdAt` e `updatedAt`
  },
);

module.exports = { User };
