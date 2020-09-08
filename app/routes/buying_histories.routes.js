module.exports = app => {
    const buyingHistories = require("../controllers/buying_histories.controller.js");
  
  
    var router = require("express").Router();
  
    // Create a new Buying History
    router.post("/", buyingHistories.create);
  
    // Retrieve all buyingHistories
    router.get("/", buyingHistories.findAll);
  
  
    // Retrieve a single Buying History with id
    router.get("/:id", buyingHistories.findOne);
  
    // Update a Buying History with id
    router.put("/:id", buyingHistories.update);
  
    // Delete a Buying History with id
    router.delete("/:id", buyingHistories.delete);
  
    // Delete buyingHistories by list of ids
    router.post("/list-delete", buyingHistories.deleteList);
  
    app.use('/api/buyingHistories', router);
  };
  