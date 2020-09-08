module.exports = app => {
    const orderDetails = require("../controllers/order_details.controller.js");
  
  
    var router = require("express").Router();
  
    // Create a new Order Detail
    router.post("/", orderDetails.create);
  
    // Retrieve all orderDetails
    router.get("/", orderDetails.findAll);
  
  
    // Retrieve a single Order Detail with id
    router.get("/:id", orderDetails.findOne);
  
    // Update a Order Detail with id
    router.put("/:id", orderDetails.update);
  
    // Delete a Order Detail with id
    router.delete("/:id", orderDetails.delete);
  
    // Delete orderDetails by list of ids
    router.delete("/", orderDetails.deleteList);
  
    app.use('/api/orderDetails', router);
  };
  