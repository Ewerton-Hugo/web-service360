const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelizeConf');
const { OrdemServ } = require('../ordemserv/ordemserv');
// const { Atos } = require('../atos/atos'); // Certifique-se de importar o modelo Atos

const AtosTipos = sequelize.define('AtosTipos', {
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
      ato_tipo_tj_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      livro_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      prazo_dias: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      prazo_corrido: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      biometria: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      pede_qtd_selos: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      usa_imoveis: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      consec: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      coaf: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      doi: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      vlr_folha: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      vlr_imovel: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      perc_imovel: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      permuta: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      tabvalores_tipotelaato_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      excluido: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      created: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('now()'),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_alteracao_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      pai_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      layout_impressao_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      serie_protocolo_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      rota: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      ordem_exibicao: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },
},  
{
    sequelize, // a instância do Sequelize deve ser passada aqui
    modelName: 'AtosTipos',
    tableName: 'atos_tipos',
    timestamps: false, // se não há colunas `createdAt` e `updatedAt`
});


module.exports = {AtosTipos};

