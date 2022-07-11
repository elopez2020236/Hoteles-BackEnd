const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Servicios = Schema({
    nombreServicio: String,
    costoServicio: Number,

});

module.exports = mongoose.model("Servicios", Servicios);