module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Client', {
      numeroClient:  {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,   
      allowNull: false
    }
    });
};