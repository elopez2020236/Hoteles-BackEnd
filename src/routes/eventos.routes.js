const express = require("express");
const eventosController = require("../controllers/eventos.controller");

const md_autenticacion = require("../middlewares/autenticacion");

const api = express.Router();

api.post("/verEventos", eventosController.ObtenerEventos);
api.post("/agregarEvento", eventosController.AgregarEventos);
api.put("/editarEvento/:idEvento", eventosController.EditarEventos);
api.delete("/eliminarEvento/:idEvento", eventosController.EliminarEventos);

module.exports = api;