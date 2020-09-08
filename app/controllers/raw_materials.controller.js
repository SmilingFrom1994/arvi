const db = require("../models");
const logger = require('../services/logger-write-methods');
const RawMaterials = db.rawMaterials;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    console.log(req, res);

    if(!req.body.product_name){
        res.status(404).send({
            message: "Product Name is not supplied."
        })
        return;
    }

    const rawMaterial = {
        product_name: req.body.product_name,
    }

    RawMaterials.create(rawMaterial).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Some error occured",
            error: err
        })
    })
}

exports.findAll = (req, res) => {
    RawMaterials.findAll({})
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

    RawMaterials.findByPk(id)
      .then(data => {
          if( data != null ){
            res.send(data);
          }else{
            res.status(404).send({
                message: "Raw Material not found"
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

    RawMaterials.update(req.body, {
        where: {id: id}
    }).then(num => {
        if(num == 1){
            res.send({
                message: "Raw Material updated successfully."
            })
        }else{
            res.send({
                message: "Raw Material not found"
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

    RawMaterials.destroy({
        where: {id: id}
    }).then(num => {
        if(num == 1){
            res.send({
                message: "Raw Material deleted successfully."
            })
        }else{
            res.status(404).send({
                message: "Raw Material is not found."
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

    RawMaterials.destroy({
        where: {id: deleteIds}
    }).then(num => {
        if(num == deleteIds.length){
            res.send({
                message: "All Raw Materials deleted successfully"
            })
        }else{
            res.send({
                message: "All Raw Materials could not be deleted, May be some Raw Materials are not found."
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: "Some error occurred.",
            error: err
        })
    })
}