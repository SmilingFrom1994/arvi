module.exports = {
  HOST: "localhost",

  //*prod creds
  USER: "arvi",
  PASSWORD: "admin",
  DB: "arvi_prod",

  //*local creds
  // USER: "root",
  // PASSWORD: "",
  // DB: "arvi_test",


  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
