module.exports = (sequelize, DataTypes) => {
    const Sequelize = require("sequelize");
    const BuyingHistories = sequelize.define("buying_histories", {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        raw_material_id: {
          type: DataTypes.INTEGER,
        },
        buy_from: {
          type: DataTypes.STRING,
        },
        quantity: {
          type: DataTypes.DECIMAL(10,2),
        },
        unit_for_quantity: {
          type: DataTypes.STRING,
        },
        rate: {
          type: DataTypes.DECIMAL(10, 2),
        },
        unit_for_rate: {
          type: DataTypes.STRING,
        },
        discount: {
          type: DataTypes.DECIMAL(10,2),
        },
        gross: {
          type: DataTypes.DECIMAL(10,2),
        },
      });
  
    return BuyingHistories;
  };
  