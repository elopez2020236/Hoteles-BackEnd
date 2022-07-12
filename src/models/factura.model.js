const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Factura = Schema({
    nombre: String,
    Habitaciones: [{ type: Schema.Types.ObjectId, ref: 'Habitaciones'}],
    Servicios:[{ type: Schema.Types.ObjectId, ref: 'Servicios'}],
    TotalPaguar:Number
    
    
});

module.exports = mongoose.model("Factura", Factura);