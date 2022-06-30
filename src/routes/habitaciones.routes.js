const express = require("express");
const hotelesController = require("../controllers/habitaciones.controllers");

const md_autenticacion = require("../middlewares/autenticacion");

const api = express.Router();

api.post("/verHabitaciones", md_autenticacion.Auth, hotelesController.ObtenerHabitaciones);
api.post("/agregarHabitacion", md_autenticacion.Auth, hotelesController.AgregarHabitaciones);
api.put("/editarHabitacion/:idHabitacion", md_autenticacion.Auth, hotelesController.EditarHabitaciones);
api.delete("/eliminarHaitacion/:idHabitacion", md_autenticacion.Auth, hotelesController.EliminarHabitaciones);

module.exports = api;