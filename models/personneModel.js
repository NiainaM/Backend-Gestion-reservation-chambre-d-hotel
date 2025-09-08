const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Personne', {
    nom: DataTypes.STRING,
    prenoms: DataTypes.STRING,
    email: DataTypes.STRING,
    tel: DataTypes.STRING,
    mdp: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: async (personne) => {
        if (personne.mdp) {
          const salt = await bcrypt.genSalt(10);
          personne.mdp = await bcrypt.hash(personne.mdp, salt);
        }
      },
      beforeUpdate: async (personne) => {
        if (personne.mdp) { 
          const salt = await bcrypt.genSalt(10);
          personne.mdp = await bcrypt.hash(personne.mdp, salt);
        }
      }
    }
  });
};
