const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const _ = require('lodash');
const path = require("path");
const Logger = require('./app/services/logger_service');
var datetime = new Date();
datetime=datetime.toISOString().slice(0,10);
const logger = new Logger(datetime);



const app = express();

var corsOptions = {
  origin: "*"
};
app.use(fileUpload({
    createParentPath: true
}));

//add other middleware
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



app.use(morgan('dev'));
const db = require("./app/models");
db.sequelize.sync({ force: false }).then(() => {
  // console.log("Drop and re-sync db.");
});

// app.use(express.static(path.join(__dirname,'css'));
app.use(express.static(path.join(__dirname,'/app/views/public')));



// simple route
app.get("/", (req, res) => {
  // res.json({ message: "Welcome to Hope application." });
  res.sendFile(path.join(__dirname,'/app/views/error-404.html'));
});

app.get("/data-image/:filename", (req, res, filename) => {
  // res.json({ dir_path:  path.join(__dirname, "./uploads/"+filename)});
  res.sendFile(path.join(__dirname, "./uploads/"+req.params.filename));
});
// require("./app/routes/categories.routes")(app);
// require("./app/routes/content.routes")(app);

require("./app/routes/users.routes")(app);
require("./app/routes/accounts.routes")(app);
require("./app/routes/raw_materials.routes")(app);
require("./app/routes/buying_histories.routes")(app)
require("./app/routes/customers.routes")(app);
require("./app/routes/orders.routes")(app);
require("./app/routes/transactions.routes")(app);
require("./app/routes/products.routes")(app);
require("./app/routes/order_details.routes")(app);

// require("./app/routes/fileupload.routes")(app);
// require("./app/routes/autoContent.routes")(app);
// require("./app/routes/reddit.routes")(app);

// set port, listen for requests

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
   logger.info(`Server started on port ${PORT}.`);


});
