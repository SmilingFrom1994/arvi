module.exports = (sequelize, DataTypes) => {
    const Sequelize = require("sequelize");
    const Accounts = sequelize.define("accounts", {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        payment_type: {
          type: DataTypes.STRING,
        },
        amount: {
          type: DataTypes.DECIMAL(10,2),
        },
      });
  
    return Accounts;
  };
  