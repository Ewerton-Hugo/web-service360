const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelizeConf');
const { Atos } = require('../atos/atos');
const { AtosTipos } = require('../atos_tipo/atos_tipo');

// const { Atos } = require('../atos/atos'); // Certifique-se de importar o modelo Atos

const AtosAnexos = sequelize.define('AtosAnexos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ato_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'atos',
            key: 'id',
        },
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // protocolo: {
    //     type: DataTypes.INTEGER,
    //     allowNull: true,
    // },
     excluido: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
    
},  
{
    sequelize, // a instância do Sequelize deve ser passada aqui
    modelName: 'AtosAnexos',
    tableName: 'atos_anexos',
    timestamps: false, // se não há colunas `createdAt` e `updatedAt`
});
// Atos.belongsTo(Pessoa, { foreignKey: 'pessoa_id', as: 'pessoa', targetKey: 'id' });

AtosAnexos.belongsTo(Atos, {
    foreignKey: 'ato_id',
    as: 'atos',
    targetKey: 'id',
  });


module.exports = {AtosAnexos};

