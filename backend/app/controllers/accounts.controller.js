const db = require("../models");
const logger = require('../services/logger-write-methods');
const Accounts = db.accounts;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    console.log(req, res);

    if(!req.body.paymentType){
        res.status(404).send({
            message: "Payment type is not supplied",
        });
        return;
    }else if(!req.body.amount){
        res.status(404).send({
            message: "Amount is not supplied",
        });
        return;
    }

    //Mapping Accont table values
    const account = {
        payment_type: req.body.paymentType,
        amount: req.body.amount,
    }

    Accounts.create(account).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating User."
        });
    })
}

exports.findAll = (req, res) => {
    Accounts.findAll({})
     .then(data => {
            res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    })
}

exports.findOne = (req, res) => {
    const id = req.params.id;

    Accounts.findByPk(id)
     .then(data => {
        if(data!=null){
            res.send(data);
        }else{
            res.status(404).send({
                message: "Account not found."
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error retrieving Account with id=" + id
        });
    })
}

exports.update = (req, res) => {
    const id = req.params.id;
    req.body.payment_type = req.body.paymentType;
    Accounts.update(req.body, {
        where: { id: id }
    })
      .then(num => {
          if(num == 1){
            res.send({
                message: "Account was updated successfully.",
                data: {"paymentType": req.body.paymentType, "amount": req.body.amount}
            });
          }else{
            res.send({
                message: `Cannot update Account with id=${id}. Maybe Account was not found or req.body is empty!`
            });
          }
      })
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Accounts.destroy({
        where: { id: id }
    }).then(num => {
        if(num == 1){
            res.send({
                message: "Account was deleted successfully!"
            });
        }else{
            res.send({
                message: "The account could not be deleted, Maybe the account is not found!"
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: "Some error occured, Error statement: "+err.message,
        })
    })
}

exports.deleteList = (req, res) => {
    console.log(req, res);
    var deleteIds = [];

    if(req.body.listIds){
        deleteIds = req.body.listIds;
    }

    Accounts.destroy({
        where: {id: deleteIds}
    }).then(num => {
        if(num==deleteIds.length){
            res.send({
                message: "Accounts are deleted successfully"
            })
        }else{
            res.send({
                message: "All accounts could not be deleted, May be some of the accounts are not found"
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: "Some error occured, Error description: "+err.message
        })
    })
}