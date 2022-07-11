const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReservacionSchema = Schema({
  idUsuario: { type: Schema.Types.ObjectId, ref: 'Usuarios' },
  idHabitacion:[{  type: Schema.Types.ObjectId, ref: 'Habitaciones'}]
});

module.exports = mongoose.model("Reservacion", ReservacionSchema);
