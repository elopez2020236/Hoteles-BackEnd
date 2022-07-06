const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Eventos = Schema({
    nombre: String,
    hora: String,
    fecha: String,
    asistentes: String,
    idHoteles: { type: Schema.Types.ObjectId, ref: "Hotel" },
    idTipoEvento: { type: Schema.Types.ObjectId, ref: "TipoEvento" }
});

module.exports = mongoose.model("Eventos", Eventos);