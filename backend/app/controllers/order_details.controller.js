const db = require("../models");
const logger = require('../services/logger-write-methods');
const OrderDetails = db.orderDetails;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    console.log(req, res);

    if(!req.body.order_id){
        res.status(404).send({
            message: "Order id is not supplied."
        })
        return;
    }else if(!req.body.product_id){
        res.status(404).send({
            message: "Product Id is not supplied."
        })
        return;
    }else if(!req.body.unit_amount){
        res.status(404).send({
            message: "Unit Amount is not supplied."
        })
        return;
    }else if(!req.body.quantity){
        res.status(404).send({
            message: "Quantity is not supplied."
        })
        return;
    }else if(!req.body.total_amount){
        res.status(404).send({
            message: "Total Amount is not supplied."
        })
        return;
    }

    const orderDetail = {
        order_id: req.body.order_id,
        product_id: req.body.product_id,
        unit_amount: req.body.unit_amount,
        quantity: req.body.quantity,
        total_amount: req.body.total_amount,
        discount: (req.body.discount) ? req.body.discount : 0.00
    }

    OrderDetails.create(orderDetail).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Some error occured",
            error: err
        })
    })
}

exports.findAll = (req, res) => {
    OrderDetails.findAll({})
      .then(data => {
          res.send(data);
      }).catch(err => {
          res.status(500).send({
              message: "Some error occured",
              data: err
          })
      })
}

exports.findOne = (req, res) => {
    const id = req.params.id;

    OrderDetails.findByPk(id)
      .then(data => {
          if( data != null ){
            res.send(data);
          }else{
            res.status(404).send({
                message: "Order Detail not found"
            })
          }
      }).catch(err => {
          res.status(500).send({
              message: "Some error occured",
              error: err
          })
      })
}

exports.update = (req, res) => {
    const id = req.params.id;

    OrderDetails.update(req.body, {
        where: {id: id}
    }).then(num => {
        if(num == 1){
            res.send({
                message: "Order Detail updated successfully."
            })
        }else{
            res.send({
                message: "Order Detail not found"
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: "Some error occured",
            error: err
        })
    })
}

exports.delete = (req, res) => {
    const id = req.params.id;

    OrderDetails.destroy({
        where: {id: id}
    }).then(num => {
        if(num == 1){
            res.send({
                message: "Order Detail deleted successfully."
            })
        }else{
            res.status(404).send({
                message: "Order Detail is not found."
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: "Some error occurred.",
            error: err
        })
    })
}

exports.deleteList = (req, res) => {
    console.log(req, res)

    var deleteIds = [];

    if(req.body.listIds || req.body.listIds.length>0){
        deleteIds = req.body.listIds;
    }

    OrderDetails.destroy({
        where: {id: deleteIds}
    }).then(num => {
        if(num == deleteIds.length){
            res.send({
                message: "All Orders Details deleted successfully"
            })
        }else{
            res.send({
                message: "All Orders Details could not be deleted, May be some Orders Details are not found."
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: "Some error occurred.",
            error: err
        })
    })
}