module.exports = (sequelize, DataTypes) => {
  const Sequelize = require("sequelize");
  const Users = sequelize.define("users", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      user_type: {
        type: DataTypes.INTEGER,
      },
      
    });

  return Users;
};
