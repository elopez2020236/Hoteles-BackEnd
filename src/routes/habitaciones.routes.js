const express = require("express");
const habitacionesController = require("../controllers/habitaciones.controllers");

const md_autenticacion = require("../middlewares/autenticacion");

const api = express.Router();

api.get('/verHabitaciones', habitacionesController.ObtenerHabitaciones);
api.post('/agregarHabitacion', habitacionesController.AgregarHabitaciones);
api.put('/editarHabitacion/:idHabitacion', habitacionesController.EditarHabitaciones);
api.delete('/eliminarHabitacion/:idHabitacion', habitacionesController.EliminarHabitaciones);
api.get('/habitacion/:idHabitacion', habitacionesController.ObtenerHabitacionId);

module.exports = api;

//api.get('/verHabitaciones', md_autenticacion.Auth, hotelesController.ObtenerHabitaciones);