const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const HotelSchema = mongoose.Schema({
  nombre: String,
  direccion: String,
  telefono: String,
  idGerente: { type: Schema.Types.ObjectId, ref: "Usuarios" },
  Habitaciones: [{ type: Schema.Types.ObjectId, ref: 'Habitaciones'}],
  Servios:[{ type: Schema.Types.ObjectId, ref: 'Servicios'}],
  Eventos:[{ type: Schema.Types.ObjectId, ref: 'Eventos'}],
  Huespedes:[{ type: Schema.Types.ObjectId, ref: 'Usuarios'}]
});

module.exports = mongoose.model("Hotel", HotelSchema);
