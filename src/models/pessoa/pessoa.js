const { DataTypes } = require('sequelize');
const {sequelize} = require('../../config/sequelizeConf'); // Ajuste o caminho conforme necessário

const Pessoa = sequelize.define('Pessoa', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cartorio_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nome: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tipo_pessoa: {
    type: DataTypes.TEXT,
  },
  doc_identificacao: {
    type: DataTypes.TEXT,
  },
  tabvalores_sexo_id: {
    type: DataTypes.INTEGER,
  },
  tabvalores_estadocivil_id: {
    type: DataTypes.INTEGER,
  },
  profissao: {
    type: DataTypes.TEXT,
  },
  tabvalores_capacidadecivil_id: {
    type: DataTypes.INTEGER,
  },
  tabvalores_nacionalidade_id: {
    type: DataTypes.INTEGER,
  },
  cidade_nascimento: {
    type: DataTypes.TEXT,
  },
  cidade_nascimento_estrangeiro: {
    type: DataTypes.TEXT,
  },
  cpf_pai: {
    type: DataTypes.STRING(11),
  },
  nome_pai: {
    type: DataTypes.TEXT,
  },
  cpf_mae: {
    type: DataTypes.STRING(11),
  },
  nome_mae: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  fone_celular: {
    type: DataTypes.STRING(11),
  },
  fone_residencial: {
    type: DataTypes.STRING(11),
  },
  fone_comercial: {
    type: DataTypes.STRING(11),
  },
  local_trabalho: {
    type: DataTypes.TEXT,
  },
  autorizacao: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  autorizacao_observacao: {
    type: DataTypes.TEXT,
  },
  conjugue_cpf: {
    type: DataTypes.STRING(11),
  },
  conjugue_nome: {
    type: DataTypes.TEXT,
  },
  tabvalores_regimeuniao_id: {
    type: DataTypes.INTEGER,
  },
  pol_exposta: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  pol_exposta_data: {
    type: DataTypes.DATE,
  },
  email: {
    type: DataTypes.TEXT,
  },
  observacao: {
    type: DataTypes.TEXT,
  },
  excluido: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  data_nascimento: {
    type: DataTypes.DATE,
  },
  created: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_alteracao_id: {
    type: DataTypes.INTEGER,
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  link_foto: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  link_ficha: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  inscricao_estadual: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  nome_fantasia: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'pessoas',
  timestamps: false,
});

module.exports = {Pessoa};
