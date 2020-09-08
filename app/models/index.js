const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.accounts = require("./account.model.js")(sequelize, Sequelize);
db.products = require("./product.model.js")(sequelize, Sequelize);
db.rawMaterials = require('./raw_materials.model.js')(sequelize, Sequelize);
db.orders = require("./order.model.js")(sequelize, Sequelize);
db.orderDetails = require("./order_detail.model.js")(sequelize, Sequelize); 
db.transactions = require("./transaction.model.js")(sequelize, Sequelize);
db.buyingHistories = require("./buying_history.model.js")(sequelize, Sequelize);
db.users = require("./users.model.js")(sequelize, Sequelize);
db.customers = require("./customer.model.js")(sequelize, Sequelize);

db.orders.belongsTo(db.customers, {
  foreignKey: "customer_id",
});

// db.customers.hasMany(db.orders);

// db.orders.belongsTo(db.transactions, {
//   foreignKey: "transaction_id",
// })

// db.transactions.hasOne(db.orders);

db.buyingHistories.belongsTo(db.rawMaterials, {
  foreignKey: "raw_material_id",
})

// db.rawMaterials.hasMany(db.buyingHistories);

db.orderDetails.belongsTo(db.orders, {
  foreignKey: "order_id",
});

// db.orders.hasMany(db.orderDetails);

db.orderDetails.belongsTo(db.products, {
  foreignKey: "product_id",
});

// db.products.hasMany(db.orderDetails);

db.customers.belongsTo(db.users, {
  foreignKey: "user_id",
});


// db.content.belongsTo(db.users, {
//   foreignKey: "users_id",
// });


module.exports = db;
