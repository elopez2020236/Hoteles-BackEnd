const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReservacionSchema = Schema({
  entrada: Date,
  salida: Date,
  idUsuario: { type: Schema.Types.ObjectId, ref: 'Usuarios' },
});

module.exports = mongoose.model("Reservacion", ReservacionSchema);
