const db = require("../models");
const logger = require('../services/logger-write-methods');
const BuyingHistories = db.buyingHistories;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    console.log(req, res);

    if(!req.body.buy_from){
        res.status(404).send({
            message: "Raw material bought from is not supplied."
        })
        return;
    }else if(!req.body.quantity){
        res.status(404).send({
            message: "Raw material quantity is not supplied."
        })
        return;
    }else if(!req.body.unit_for_quantity){
        res.status(404).send({
            message: "Unit is not supplied"
        })
        return;
    }else if(!req.body.rate){
        res.status(404).send({
            message: "Rate is not supplied"
        })
        return;
    }else if(!req.body.unit_for_rate){
        res.status(404).send({
            message: "Rate for unit is supplied"
        })
        return;
    }else if(!req.body.total){
        res.status(404).send({
            message: "Total is not supplied."
        })
        return;
    }else if(!req.body.gross){
        res.status(404).send({
            message: "Gross total is not supplied"
        })
        return;
    }

    const buyHistory = {
        raw_material_id: req.body.raw_material_id,
        buy_from: req.body.buy_from,
        quantity: req.body.quantity,
        unit_for_quantity: req.body.unit_for_quantity,
        rate: req.body.rate,
        unit_for_rate: req.body.unit_for_rate,
        discount: (req.body.discount) ? req.body.discount : 0.00,
        gross: req.body.gross
    }

    BuyingHistories.create(buyHistory).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Some error occured",
            error: err
        })
    })
}

exports.findAll = (req, res) => {
    BuyingHistories.findAll({})
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

    BuyingHistories.findByPk(id)
      .then(data => {
          if( data != null ){
            res.send(data);
          }else{
            res.status(404).send({
                message: "Buy-History not found"
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

    BuyingHistories.update(req.body, {
        where: {id: id}
    }).then(num => {
        if(num == 1){
            res.send({
                message: "Buying History updated successfully."
            })
        }else{
            res.send({
                message: "Buying History not found"
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

    BuyingHistories.destroy({
        where: {id: id}
    }).then(num => {
        if(num == 1){
            res.send({
                message: "Buying History deleted successfully."
            })
        }else{
            res.status(404).send({
                message: "Buying History is not found."
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

    BuyingHistories.destroy({
        where: {id: deleteIds}
    }).then(num => {
        if(num == deleteIds.length){
            res.send({
                message: "All Buying Histories deleted successfully"
            })
        }else{
            res.send({
                message: "All Histories could not be deleted, May be some Histories are not found."
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: "Some error occurred.",
            error: err
        })
    })
}