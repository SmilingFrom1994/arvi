module.exports = (sequelize, DataTypes) => {
    const Sequelize = require("sequelize");
    const Orders = sequelize.define("orders", {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        transaction_id: {
          type: DataTypes.STRING,
        },
        customer_id: {
          type: DataTypes.INTEGER,
        },
        total_amount: {
          type: DataTypes.DECIMAL(10,2),
        },
        paid_amount: {
          type: DataTypes.DECIMAL(10,2),
        },
        due_amount: {
          type: DataTypes.DECIMAL(10,2),
        },
        
      });
  
    return Orders;
  };
  