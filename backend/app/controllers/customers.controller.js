const db = require("../models");
const logger = require('../services/logger-write-methods');
const Customers = db.customers;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    console.log(req, res);

    if(!req.body.name){
        res.status(404).send({
            message: "Customer Name is not supplied."
        })
        return;
    }else if(!req.body.email && !req.body.phone){
        res.status(404).send({
            message: "Customer Contact is not supplied."
        })
        return;
    }

    const customer = {
        user_id: req.body.user_id,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
    }

    Customers.create(customer).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Some error occured",
            error: err
        })
    })
}

exports.findAll = (req, res) => {
    Customers.findAll({})
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

    Customers.findByPk(id)
      .then(data => {
          if( data != null ){
            res.send(data);
          }else{
            res.status(404).send({
                message: "Customer not found"
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

    Customers.update(req.body, {
        where: {id: id}
    }).then(num => {
        if(num == 1){
            res.send({
                message: "Customer updated successfully."
            })
        }else{
            res.send({
                message: "Customer not found"
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

    Customers.destroy({
        where: {id: id}
    }).then(num => {
        if(num == 1){
            res.send({
                message: "Customer deleted successfully."
            })
        }else{
            res.status(404).send({
                message: "Customer is not found."
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

    Customers.destroy({
        where: {id: deleteIds}
    }).then(num => {
        if(num == deleteIds.length){
            res.send({
                message: "All Customers deleted successfully"
            })
        }else{
            res.send({
                message: "All Customers could not be deleted, May be some Customers are not found."
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: "Some error occurred.",
            error: err
        })
    })
}