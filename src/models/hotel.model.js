const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const HotelSchema = mongoose.Schema({
  nombre: String,
  direccion: String,
  telefono: String,
  idGerente: { type: Schema.Types.ObjectId, ref: "Usuarios" },
  Habitaciones: [{ type: Schema.Types.ObjectId, ref: 'Habitaciones'}]

});

module.exports = mongoose.model("Hotel", HotelSchema);
