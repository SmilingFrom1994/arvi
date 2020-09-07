const db = require("../models");
const logger = require('../services/logger-write-methods');
const md5 = require('md5');
const Users = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User

exports.create = (req, res) => {
    logger.writeLogInfo(req, "Request recieved at /Users/")
    console.log(req.body);
    // Validate request

    if(!req.body.username) {
        res.status(400).send({
            message: "Username is not supplied"
        });
        logger.writeLogError("Username is not supplied in User create service", JSON.stringify(req.body))
        return;
    }
    
    // Create a User
    const users = {
        username: req.body.username,
        password: md5(req.body.password),
        user_type: (req.body.userType) ? req.body.userType : 1,
    };

    // Save User in the database
    Users.create(users).then(data => {
        res.send(data);
        logger.writeLogInfo(req, "User row created successfully");
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating User."
        });
        logger.writeLogError("Some error occurred while creating User.", err)
    });
};


// Retrieve all Users from the database.

exports.findAll = (req, res) => {
  Users.findAll({})
    .then(data => {
      logger.writeLogInfo(req, "Returned all rows from Users table");
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
      logger.writeLogError("Some error occurred while retrieving users.", err);
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
 const id = req.params.id;

  Users.findByPk(id)
    .then(data => {
      if(data!=null){
        res.send(data);
        logger.writeLogInfo(req, "User is retrieved");
      }else{
        res.status(404).send({
          message: "User could not be retrieved, or maybe User is not found."
        })
        logger.writeLogError("Maybe User is not found.", "User could not be retrieved");
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
      logger.writeLogError("Error retrieving User with id="+id, err);
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  logger.writeLogInfo(req, "Request recieved at /users/:id",id);

  req.body.password = md5(req.body.password);
  Users.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        logger.writeLogInfo(req, "User was updated successfully.");
        res.send({
          message: "User was updated successfully."
        });
      } else {
        logger.writeLogError("Cannot update User with id="+id, "Maybe Category was not found or req.body is empty!");
        // logger.error("Request Body : "req.body);
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      logger.writeLogError(`Cannot update User with id=${id}`, err);
      // logger.error("Request Body : "req.body);
      // logger.error("Error : ",err);
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
}

exports.delete = (req, res) => {
  const id = req.params.id;
  logger.writeLogInfo(req, `Request recieved at /users/${id}`);
  Users.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
        logger.writeLogInfo(req, `User is deleted successfully`);
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
        logger.writeLogError(`Cannot delete User with id=${id}`, "Maybe User was not found");
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
      logger.writeLogError("Some error occured", err);
    });
}

exports.deleteList = (req, res) => {
  logger.writeLogInfo(req, "Request recieved at /users/delete-list")
  console.log(req.body);

  var deleteIds = [];
  if(req.body.listIds){
    deleteIds = req.body.listIds;
  }

  Users.destroy({
    where: { id: deleteIds }
  })
  .then(num => {
    if (num == deleteIds.length) {
      res.send({
        message: "Users are deleted successfully!"
      });
      logger.writeLogInfo(req, `Users are deleted successfully`);
    } else {
      res.send({
        message: `Cannot delete Users Maybe some or all Users are not found!`,
        data: num,
        deleteIds: deleteIds.legth
      });
      logger.writeLogError(`Cannot delete Users`, "Maybe all Users or Some users are not found");
    }
  })
  .catch(err => {
    logger.writeLogError("Some error occured", err);
    res.status(500).send({
      message: "Could not delete Users",
    });
    
  });

}


