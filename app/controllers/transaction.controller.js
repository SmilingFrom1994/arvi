const db = require("../models");
const logger = require('../services/logger-write-methods');
const Transactions = db.transactions
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    console.log(req, res);

    if(!req.body.order_id){
        res.status(404).send({
            message: "Order id is not supplied."
        })
        return;
    }else if(!req.body.transaction_id){
        res.status(404).send({
            message: "Transaction id is not supplied."
        })
        return;
    }else if(!req.body.amount){
        res.status(404).send({
            message: "Amount is not supplied."
        })
        return;
    }

    const transaction = {
        order_id: req.body.order_id,
        transaction_id: req.body.transaction_id,
        amount: req.body.amount,
    }

    Transactions.create(transaction).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Some error occured",
            error: err
        })
    })
}

exports.findAll = (req, res) => {
    Transactions.findAll({})
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

    Transactions.findByPk(id)
      .then(data => {
          if( data != null ){
            res.send(data);
          }else{
            res.status(404).send({
                message: "Transaction not found"
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

    Transactions.update(req.body, {
        where: {id: id}
    }).then(num => {
        if(num == 1){
            res.send({
                message: "Transaction updated successfully."
            })
        }else{
            res.send({
                message: "Transaction not found"
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

    Transactions.destroy({
        where: {id: id}
    }).then(num => {
        if(num == 1){
            res.send({
                message: "Transaction deleted successfully."
            })
        }else{
            res.status(404).send({
                message: "Transaction is not found."
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

    Transactions.destroy({
        where: {id: deleteIds}
    }).then(num => {
        if(num == deleteIds.length){
            res.send({
                message: "All Transactions deleted successfully"
            })
        }else{
            res.send({
                message: "All Transactions could not be deleted, May be some Transactions are not found."
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: "Some error occurred.",
            error: err
        })
    })
}