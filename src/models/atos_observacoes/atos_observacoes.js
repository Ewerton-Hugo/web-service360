const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelizeConf');
const { User } = require('../users/users');
// const { Atos } = require('../atos/atos'); // Certifique-se de importar o modelo Atos

const AtosObservacoes= sequelize.define('AtosObservacoes', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ato_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      observacao: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      excluido: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      created: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('now()'),
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_alteracao_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },



      
},  
{
    sequelize, // a instância do Sequelize deve ser passada aqui
    modelName: 'AtosObservacoes',
    tableName: 'atos_observacoes',
    timestamps: false, // se não há colunas `createdAt` e `updatedAt`
});
AtosObservacoes.belongsTo(User, { foreignKey: 'user_id', as: 'users', targetKey: 'id' });

module.exports = {AtosObservacoes};

