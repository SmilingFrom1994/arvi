module.exports = app => {
    const transactions = require("../controllers/transaction.controller.js");
  
  
    var router = require("express").Router();
  
    // Create a new Transaction
    router.post("/", transactions.create);
  
    // Retrieve all transactions
    router.get("/", transactions.findAll);
  
  
    // Retrieve a single Transaction with id
    router.get("/:id", transactions.findOne);
  
    // Update a Transaction with id
    router.put("/:id", transactions.update);
  
    // Delete a Transaction with id
    router.delete("/:id", transactions.delete);
  
    // Delete transactions by list of ids
    router.delete("/", transactions.deleteList);
  
    app.use('/api/transactions', router);
  };
  