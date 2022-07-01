const express = require("express");
const hotelesController = require("../controllers/habitaciones.controllers");

const md_autenticacion = require("../middlewares/autenticacion");

const api = express.Router();

api.get('/verHabitaciones', hotelesController.ObtenerHabitaciones);
api.post('/agregarHabitacion', md_autenticacion.Auth, hotelesController.AgregarHabitaciones);
api.put('/editarHabitacion/:idHabitacion', hotelesController.EditarHabitaciones);
api.delete('/eliminarHabitacion/:idHabitacion', hotelesController.EliminarHabitaciones);
api.get('/habitacion/:idHabitacion', hotelesController.ObtenerHabitacionId);

module.exports = api;

//api.get('/verHabitaciones', md_autenticacion.Auth, hotelesController.ObtenerHabitaciones);