module.exports = (sequelize, DataTypes) => {
  return sequelize.define("auth", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    refresh: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
};
