module.exports = app => {
    const customers = require("../controllers/customers.controller.js");
  
  
    var router = require("express").Router();
  
    // Create a new Customer
    router.post("/", customers.create);
  
    // Retrieve all customers
    router.get("/", customers.findAll);
  
  
    // Retrieve a single Customer with id
    router.get("/:id", customers.findOne);
  
    // Update a Customer with id
    router.put("/:id", customers.update);
  
    // Delete a Customer with id
    router.delete("/:id", customers.delete);
  
    // Delete customers by list of ids
    router.post("/list-delete", customers.deleteList);
  
    app.use('/api/customers', router);
  };
  