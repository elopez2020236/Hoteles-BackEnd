const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReservacionSchema = Schema({
  idUsuario: { type: Schema.Types.ObjectId, ref: 'Usuarios' },
  idHabitacion:[{  type: Schema.Types.ObjectId, ref: 'Habitaciones'}],
  idHotel: {type: Schema.Types.ObjectId, ref: 'Hotel' },
  numeroDias:Number,
  estado:Boolean,
});

module.exports = mongoose.model("Reservacion", ReservacionSchema);
