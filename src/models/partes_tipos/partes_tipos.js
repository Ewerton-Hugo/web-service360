const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelizeConf');
// const { Atos } = require('../atos/atos'); // Certifique-se de importar o modelo Atos

const PartesTipos= sequelize.define('PartesTipos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    cartorio_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    qualificacao: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    consec: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

    coaf: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

    tj: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

    doi: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

    excluido: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },

    created: {
        type: DataTypes.DATE,
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

    token: {
        type: DataTypes.TEXT,
        allowNull: true,
    },



      
},  
{
    sequelize, // a instância do Sequelize deve ser passada aqui
    modelName: 'PartesTipos',
    tableName: 'partes_tipos',
    timestamps: false, // se não há colunas `createdAt` e `updatedAt`
});


module.exports = {PartesTipos};

