module.exports = (sequelize, DataTypes) => {
    const Sequelize = require("sequelize");
    const Products = sequelize.define("products", {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        product_name: {
          type: DataTypes.STRING,
        },
        description: {
          type: DataTypes.STRING,
        },
        rate: {
          type: DataTypes.DECIMAL(10,2),
        },
        
      });
  
    return Products;
  };
  