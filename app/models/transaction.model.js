module.exports = (sequelize, DataTypes) => {
    const Sequelize = require("sequelize");
    const Transactions = sequelize.define("transactions", {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        order_id: {
          type: DataTypes.INTEGER,
        },
        transaction_id: {
          type: DataTypes.STRING,
        },
        amount: {
          type: DataTypes.DECIMAL(10, 2),
        },
        
      });
  
    return Transactions;
  };
  