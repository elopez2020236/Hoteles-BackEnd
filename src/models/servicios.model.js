const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Servicios = Schema({
  NombreServicio: String,
  CostoServicio: Number,
});

module.exports = mongoose.model("Servicios", Servicios);
