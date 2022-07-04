const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Servicios = Schema({
    nombreServicio: String,
    costoServicio: String,
});

module.exports = mongoose.model("Servicios", Servicios);