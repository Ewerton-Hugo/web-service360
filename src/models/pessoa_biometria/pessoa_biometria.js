const { DataTypes } = require('sequelize');
const {sequelize} = require('../../config/sequelizeConf'); // Ajuste o caminho conforme necessárioconst {Pessoa} =  require ('../pessoa/pessoa')
const {Pessoa} =  require ('../pessoa/pessoa')

const PessoasBiometria = sequelize.define('PessoasBiometria',{
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  pessoa_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dedo: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  hash: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  excluido: {
    type: DataTypes.BOOLEAN,
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
  },
  user_alteracao_id: {
    type: DataTypes.INTEGER,
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: true,
    unique: true,
  },
}, {
  sequelize, // a instância do Sequelize deve ser passada aqui
  modelName: 'PessoasBiometria',
  tableName: 'pessoas_biometria',
  timestamps: false, // se não há colunas `createdAt` e `updatedAt`
});

PessoasBiometria.belongsTo(Pessoa, { foreignKey: 'pessoa_id', as: 'pessoa', targetKey: 'id' });

module.exports = {PessoasBiometria};

