const express = require("express");
const eventosController = require("../controllers/tipoEvento.controller");
const md_autenticacion = require("../middlewares/autenticacion");

const api = express.Router();

api.post("/agregarTipoEvento", eventosController.AgregarTipoEvento);
api.post("/verTipoEvento",  eventosController.ObtenerTipoEvento);
api.put("/editarTipoEvento/:idTipoEvento", eventosController.EditarTipoEvento);
api.delete("/eliminarTipoEvento/:idTipoEvento", eventosController.eliminarTipoEvento);
module.exports = api;