const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const HotelSchema = mongoose.Schema({
  nombre: String,
  direccion: String,
  telefono: String,
  idGerente: { type: Schema.Types.ObjectId, ref: "Usuarios" },
});

module.exports = mongoose.model("Hotel", HotelSchema);
