const express = require("express");
const controllerscarrito = require("../controllers/carrito.controller");

const md_autenticacion = require("../middlewares/autenticacion");
const md_rol = require("../middlewares/roles");


const api = express.Router();


api.get('/ObternCarritodeUserLogedo',md_autenticacion.Auth, controllerscarrito.ObternCarritodeUserLogedo)


module.exports = api;