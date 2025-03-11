const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelizeConf');
const { Pessoa } = require('../pessoa/pessoa');

const { PartesTipos } = require('../partes_tipos/partes_tipos');
// const { Atos } = require('../atos/atos'); // Certifique-se de importar o modelo Atos

const AtosPessoas = sequelize.define('AtosPessoas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ato_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "atos",
            key: "id",
        },
    },
    pessoa_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "pessoas",
            key: "id",
        },
    },
    representante_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "pessoas",
            key: "id",
        },
    },
    excluido: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
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
            model: "users",
            key: "id",
        },
    },
    user_alteracao_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "users",
            key: "id",
        },
    },
    token: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: true,
    },
    sequencia: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    tipo_parte_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "partes_tipos",
            key: "id",
        },
    },
},  
{
    sequelize, // a instância do Sequelize deve ser passada aqui
    modelName: 'AtosPessoas',
    tableName: 'atos_pessoas',
    timestamps: false, // se não há colunas `createdAt` e `updatedAt`
});
AtosPessoas.belongsTo(Pessoa, { foreignKey: 'pessoa_id', as: 'pessoa', targetKey: 'id' });
AtosPessoas.belongsTo(PartesTipos, { foreignKey: 'tipo_parte_id', as: 'partes_tipos', targetKey: 'id' });
AtosPessoas.belongsTo(Pessoa, { foreignKey: 'representante_id', as: 'representante', targetKey: 'id' });
// AtosPessoas.belongsTo(User, { foreignKey: 'user_id', as: 'usuario', targetKey: 'id' });
module.exports = {AtosPessoas};

// Definindo os relacionamentos
// AtosPessoas.belongsTo(Pessoa, { foreignKey: 'pessoa_id', as: 'pessoa' });
// AtosPessoas.belongsTo(
