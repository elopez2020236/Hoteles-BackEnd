const express = require("express");
const eventosController = require("../controllers/eventos.controller");

const md_autenticacion = require("../middlewares/autenticacion");

const api = express.Router();

api.post("/verEventos",md_autenticacion.Auth,  eventosController.ObtenerEventos);
api.post("/agregarEvento",md_autenticacion.Auth, eventosController.AgregarEventos);
api.put("/editarEvento/:idEvento", md_autenticacion.Auth, eventosController.EditarEventos);
api.delete("/eliminarEvento/:idEvento", md_autenticacion.Auth, eventosController.EliminarEventos);

module.exports = api;