const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carrito = Schema({
 
    Habitacion: [{ type: Schema.Types.ObjectId, ref: 'Habitaciones'}],
    Servicios: [{ type: Schema.Types.ObjectId, ref: 'Servicios'}],
    Usuario: { type: Schema.Types.ObjectId, ref: 'Usuarios'},
    subTotal:Number,

    
});

module.exports = mongoose.model("carrito", carrito);