const express = require("express");
const facturaController = require("../controllers/factura.controller");

const md_autenticacion = require("../middlewares/autenticacion");
const md_rol = require("../middlewares/roles");

const api= express.Router();

api.post("/generarFactua",md_autenticacion.Auth,facturaController.CrearFactura);

module.exports = api;
