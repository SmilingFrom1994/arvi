module.exports = (sequelize, DataTypes) => {
    const Sequelize = require("sequelize");
    const Customers = sequelize.define("customers", {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
        },
        name: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        },
        
      });
  
    return Customers;
  };
  