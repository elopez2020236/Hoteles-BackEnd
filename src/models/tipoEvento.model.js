const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TipoEvento = Schema({
  tipoEvento: String,
});

module.exports = mongoose.model("TipoEvento", TipoEvento);
