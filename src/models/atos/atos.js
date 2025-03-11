const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelizeConf');
const { OrdemServ } = require('../ordemserv/ordemserv');
const { AtosTipos } = require('../atos_tipo/atos_tipo');


const Atos = sequelize.define('Atos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ato_tipo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'atos_tipos',
            key: 'id',
        },
    },
    cartorio_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'cartorios',
            key: 'id',
        },
    },
    protocolo_provisorio: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    protocolo: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    dt_abertura: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    dt_lavratura: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    status: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: 'PENDENTE',
    },
    livro_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'livros',
            key: 'id',
        },
    },
    folha_inicial: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    folha_final: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    folha_total: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    grs_numero: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    observacao: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    texto_minuta: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    texto_final: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    dt_cancelamento: {
        type: DataTypes.DATEONLY,
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
        unique: true,
    },
    dt_envio_consec: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    dt_envio_doi: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    valor: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true,
    },
    valor_emolumentos: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true,
    },
    valor_selos: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true,
    },
    ordemserv_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    references: {
        model: 'ordemserv',
        key: 'id',
    },
    },
    livro_numero: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    link_ato: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    excluido: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    valor_tsnr: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true,
    },
    mne: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
},  
{
    sequelize, // a instância do Sequelize deve ser passada aqui
    modelName: 'Atos',
    tableName: 'atos',
    timestamps: false, // se não há colunas `createdAt` e `updatedAt`
});

Atos.belongsTo(AtosTipos, {
    foreignKey: 'ato_tipo_id',
    as: 'atos_tipos',
    targetKey: 'id',
  });

  // Relacionamento com OrdemServ
  Atos.belongsTo(OrdemServ, {
    foreignKey: 'ordemserv_id',
    as: 'ordemserv',
    targetKey: 'id',
  });



module.exports = {Atos};

