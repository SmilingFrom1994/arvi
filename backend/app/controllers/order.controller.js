const db = require("../models");
const logger = require('../services/logger-write-methods');
const Orders = db.orders;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    console.log(req, res);

    if(!req.body.transaction_id){
        res.status(404).send({
            message: "Transaction id is not supplied."
        })
        return;
    }else if(!req.body.total_amount){
        res.status(404).send({
            message: "Order Total Amount is not supplied."
        })
        return;
    }else if(!req.body.paid_amount){
        res.status(404).send({
            message: "Order Paid Amount is not supplied."
        })
        return;
    }else if(!req.body.due_amount){
        res.status(404).send({
            message: "Order Due Amount is not supplied."
        })
        return;
    }

    const order = {
        transaction_id: req.body.transaction_id,
        customer_id: req.body.customer_id,
        total_amount: req.body.total_amount,
        paid_amount: req.body.paid_amount,
        due_amount: req.body.due_amount,
    }

    Orders.create(order).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Some error occured",
            error: err
        })
    })
}

exports.findAll = (req, res) => {
    Orders.findAll({})
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

    Orders.findByPk(id)
      .then(data => {
          if( data != null ){
            res.send(data);
          }else{
            res.status(404).send({
                message: "Order not found"
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

    Orders.update(req.body, {
        where: {id: id}
    }).then(num => {
        if(num == 1){
            res.send({
                message: "Order updated successfully."
            })
        }else{
            res.send({
                message: "Order not found"
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

    Orders.destroy({
        where: {id: id}
    }).then(num => {
        if(num == 1){
            res.send({
                message: "Order deleted successfully."
            })
        }else{
            res.status(404).send({
                message: "Order is not found."
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

    Orders.destroy({
        where: {id: deleteIds}
    }).then(num => {
        if(num == deleteIds.length){
            res.send({
                message: "All Orders deleted successfully"
            })
        }else{
            res.send({
                message: "All Orders could not be deleted, May be some Orders are not found."
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: "Some error occurred.",
            error: err
        })
    })
}