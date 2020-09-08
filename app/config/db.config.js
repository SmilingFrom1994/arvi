module.exports = {
  HOST: "localhost",
  USER: "ubuntu",
  PASSWORD: "",
  // PASSWORD: "Moriarty@221B",
  DB: "arvi_prod",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
