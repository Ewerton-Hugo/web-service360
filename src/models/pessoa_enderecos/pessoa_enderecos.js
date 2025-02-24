const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../config/sequelizeConf'); 
const { Pessoa } = require('../pessoa/pessoa');
const { TabelasValores } = require('../tabela_valores/tabelaValores');
const { Cidades } = require('../cidade/cidade');
// const { Users } = require('../user/user');  // Certifique-se de que o caminho está correto

class PessoasEnderecos extends Model {}

PessoasEnderecos.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  pessoa_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'pessoas',
      key: 'id'
    }
  },
  logradouro: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  complemento: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  bairro: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  complemento: {
    type: DataTypes.TEXT,
  },
  numero: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  cidade_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'cidades',
      key: 'id'
    }
  },
  tabvalores_tipo_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'tabelas_valores',
      key: 'id'
    }
  },
  codcep: {
    type: DataTypes.STRING(8),
    allowNull: false
  },
  excluido: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  },
  created: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  user_alteracao_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: true,
    unique: true
  },
  tabvalores_pais_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tabelas_valores',
      key: 'id'
    }
  },
  cidade_estrangeira: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  complemento: {
    type: DataTypes.TEXT,
  },
},
 {
  sequelize,
  tableName: 'pessoas_enderecos',
  timestamps: false,
},

);

PessoasEnderecos.belongsTo(Pessoa, { foreignKey: 'pessoa_id', as: 'pessoa' });
PessoasEnderecos.belongsTo(Cidades, { foreignKey: 'cidade_id', as: 'cidades' });
PessoasEnderecos.belongsTo(TabelasValores, { foreignKey: 'tabvalores_pais_id', as: 'pais' });
PessoasEnderecos.belongsTo(TabelasValores, { foreignKey: 'tabvalores_tipo_id', as: 'tipo' });
// PessoasEnderecos.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });
// PessoasEnderecos.belongsTo(Users, { foreignKey: 'user_alteracao_id', as: 'userAlteracao' });

module.exports = { PessoasEnderecos };
