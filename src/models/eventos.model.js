const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Eventos = Schema({
    nombre: String,
    hora: String,
    fecha: String,
    idHoteles: { type: Schema.Types.ObjectId, ref: "Hotel" },
});

module.exports = mongoose.model("Eventos", Eventos);