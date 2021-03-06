const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsuarioSchema = Schema({
  nombre: String,
  apellido: String,
  email: String,
  usuario: String,
  password: String,
  rol: String,
  factura:[{ type: Schema.Types.ObjectId, ref: 'Factura'}]
});

module.exports = mongoose.model("Usuarios", UsuarioSchema);
