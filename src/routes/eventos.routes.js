const express = require("express");
const eventosController = require("../controllers/eventos.controller");

const md_autenticacion = require("../middlewares/autenticacion");
const md_rol = require("../middlewares/roles");

const api = express.Router();

api.get('/verEventos', [md_autenticacion.Auth, md_rol.verEventos], eventosController.ObtenerEventos);
api.post('/agregarEvento', eventosController.AgregarEventos);
api.put("/editarEvento/:idEvento", eventosController.EditarEventos);
api.delete("/eliminarEvento/:idEvento", eventosController.EliminarEventos);
api.get('/evento/:idEvento', eventosController.ObtenerEventoId);

module.exports = api;