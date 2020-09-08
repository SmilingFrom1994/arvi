module.exports = app => {
    const rawMaterials = require("../controllers/raw_materials.controller.js");
  
  
    var router = require("express").Router();
  
    // Create a new Raw Material
    router.post("/", rawMaterials.create);
  
    // Retrieve all rawMaterials
    router.get("/", rawMaterials.findAll);
  
  
    // Retrieve a single Raw Material with id
    router.get("/:id", rawMaterials.findOne);
  
    // Update a Raw Material with id
    router.put("/:id", rawMaterials.update);
  
    // Delete a Raw Material with id
    router.delete("/:id", rawMaterials.delete);
  
    // Delete rawMaterials by list of ids
    router.delete("/", rawMaterials.deleteList);
  
    app.use('/api/rawMaterials', router);
  };
  