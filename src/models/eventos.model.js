const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Eventos = Schema({
  nombre: String,
  hora: Number,
  fecha: Number,
  asistentes: Number,
  hotel: { type: Schema.Types.ObjectId, ref: "Hoteles" },
  typeEvent : {type: Schema.Types.ObjectId, ref: "TipoEvento"}
});

module.exports = mongoose.model("Eventos", Eventos);
