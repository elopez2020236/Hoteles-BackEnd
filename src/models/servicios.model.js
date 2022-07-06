const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Servicios = Schema({
    nombreServicio: String,
    costoServicio: String,
    idHabitacion: { type: Schema.Types.ObjectId, ref: "Habitaciones" },
});

module.exports = mongoose.model("Servicios", Servicios);