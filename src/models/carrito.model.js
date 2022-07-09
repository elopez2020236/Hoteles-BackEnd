const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carrito = Schema({
    Usuario: { type: Schema.Types.ObjectId, ref: 'Usuarios'},
    Habitacion: [{ type: Schema.Types.ObjectId, ref: 'Habitaciones'}],
    Servicios: [{ type: Schema.Types.ObjectId, ref: 'Servicios'}],
    subTotal:Number,
    
});

module.exports = mongoose.model("carrito", carrito);