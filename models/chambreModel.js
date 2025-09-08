const { ROOM_TYPES } = require('./enums');

module.exports = (sequelize, DataTypes) => {
  const Chambre = sequelize.define('Chambre', {
    numero: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM(...ROOM_TYPES),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('LIBRE', 'OCCUPEE'),
      defaultValue: 'LIBRE'
    },
    // familial: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false
    // },
    prix: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    }
  });
  Chambre.beforeSave((chambre) => {
  if (chambre.type === "BASIQUE") {
    chambre.prix = 100000;
  } else if (chambre.type === "CLASSIQUE") {
    chambre.prix = 150000;
  } else if (chambre.type === "VIP") {
    chambre.prix = 200000;
  } else {
    chambre.prix = 0.00;
  }
});

Chambre.beforeUpdate((chambre) => {
  if (chambre.type === "BASIQUE") {
    chambre.prix = 100000;
  } else if (chambre.type === "CLASSIQUE") {
    chambre.prix = 150000;
  } else if (chambre.type === "VIP") {
    chambre.prix = 200000;
  } else {
    chambre.prix = 0.00;
  }
});

  return Chambre;
};
