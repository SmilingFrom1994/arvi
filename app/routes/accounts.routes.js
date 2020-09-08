module.exports = app => {
    const accounts = require("../controllers/accounts.controller.js");
  
  
    var router = require("express").Router();
  
    // Create a new Account
    router.post("/", accounts.create);
  
    // Retrieve all accounts
    router.get("/", accounts.findAll);
  
  
    // Retrieve a single Account with id
    router.get("/:id", accounts.findOne);
  
    // Update a Account with id
    router.put("/:id", accounts.update);
  
    // Delete a Account with id
    router.delete("/:id", accounts.delete);
  
    // Delete accounts by list of ids
    router.post("/list-delete", accounts.deleteList);
  
    app.use('/api/accounts', router);
  };
  