const express = require("express");
const eventosController = require("../controllers/tipoEvento.controller");
const md_autenticacion = require("../middlewares/autenticacion");

const api = express.Router();

api.post("/agregarTipoEvento", md_autenticacion.Auth, eventosController.AgregarTipoEvento);
api.post("/verTipoEvento", md_autenticacion.Auth, eventosController.ObtenerTipoEvento);
api.put("/editarTipoEvento/:idTipoEvento",md_autenticacion.Auth, eventosController.EditarTipoEvento);
api.delete("/eliminarTipoEvento/:idTipoEvento",md_autenticacion.Auth, eventosController.eliminarTipoEvento);
module.exports = api;