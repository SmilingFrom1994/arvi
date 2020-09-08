const db = require("../models");
const logger = require('../services/logger-write-methods');
const Products = db.products;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    console.log(req, res);

    if(!req.body.product_name){
        res.status(404).send({
            message: "Product Name is not supplied."
        })
        return;
    }else if(!req.body.rate){
        res.status(404).send({
            message: "Product Rate is not supplied."
        })
        return;
    }

    const product = {
        product_name: req.body.product_name,
        description: req.body.description,
        rate: req.body.rate,
    }

    Products.create(product).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Some error occured",
            error: err
        })
    })
}

exports.findAll = (req, res) => {
    console.log("I am here in findAll");
    Products.findAll({})
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

    Products.findByPk(id)
      .then(data => {
          if( data != null ){
            res.send(data);
          }else{
            res.status(404).send({
                message: "Product not found"
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

    Products.update(req.body, {
        where: {id: id}
    }).then(num => {
        if(num == 1){
            res.send({
                message: "Prduct updated successfully."
            })
        }else{
            res.send({
                message: "Prduct not found"
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

    Products.destroy({
        where: {id: id}
    }).then(num => {
        if(num == 1){
            res.send({
                message: "Product deleted successfully."
            })
        }else{
            res.status(404).send({
                message: "Product is not found."
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

    Products.destroy({
        where: {id: deleteIds}
    }).then(num => {
        if(num == deleteIds.length){
            res.send({
                message: "All Products deleted successfully"
            })
        }else{
            res.send({
                message: "All Products could not be deleted, May be some Products are not found."
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: "Some error occurred.",
            error: err
        })
    })
}