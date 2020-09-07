module.exports = (sequelize, DataTypes) => {
    const Sequelize = require("sequelize");
    const RawMaterials = sequelize.define("raw_materials", {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        material_name: {
          type: DataTypes.STRING,
        },
        
      });
  
    return RawMaterials;
  };
  