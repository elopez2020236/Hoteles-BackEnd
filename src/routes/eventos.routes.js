const express = require("express");
const hotelesController = require("../controllers/eventos.controller");

const md_autenticacion = require("../middlewares/autenticacion");

const api = express.Router();

api.post("/verEventos", md_autenticacion.Auth, hotelesController.ObtenerEventos);
api.post("/agregarEvento", md_autenticacion.Auth, hotelesController.AgregarEventos);
api.put("/editarEvento/:idEvento", md_autenticacion.Auth, hotelesController.EditarEventos);
api.delete("/eliminarEvento/:idEvento", md_autenticacion.Auth, hotelesController.EditarEventos);

module.exports = api;