module.exports = (sequelize, DataTypes) => {
    const Sequelize = require("sequelize");
    const OrderDetails = sequelize.define("order_details", {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        order_id: {
          type: DataTypes.INTEGER,
        },
        product_id: {
          type: DataTypes.INTEGER,
        },
        unit_amount: {
          type: DataTypes.DECIMAL(10,2),
        },
        quantity: {
          type: DataTypes.DECIMAL(10,2),
        },
        total_amount: {
          type: DataTypes.DECIMAL(10,2),
        },
        discount: {
          type: DataTypes.DECIMAL(10,2),
        },
      });
  
    return OrderDetails;
  };
  