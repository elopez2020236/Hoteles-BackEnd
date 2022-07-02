const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HabitacionesSchema = Schema({
    numeroHabitacion: String,
    tipoHabitacion: String,
    numeroPiso: String,
    precio: String,
    idHoteles: { type: Schema.Types.ObjectId, ref: "Hotel" },
});


module.exports = mongoose.model('Habitaciones', HabitacionesSchema)