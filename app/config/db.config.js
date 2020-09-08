module.exports = {
  HOST: "https://arvi-agarbati.herokuapp.com/",
  USER: "root",
  PASSWORD: "",
  // PASSWORD: "Moriarty@221B",
  DB: "arvi_test",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
