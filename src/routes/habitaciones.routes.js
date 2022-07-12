const express = require("express");
const habitacionesController = require("../controllers/habitaciones.controllers");

const md_autenticacion = require("../middlewares/autenticacion");
const md_rol = require("../middlewares/roles");

const api = express.Router();

api.get('/verHabitaciones', [md_autenticacion.Auth, md_rol.verHabitaciones], habitacionesController.ObtenerHabitaciones);
api.post('/agregarHabitacion/:id', habitacionesController.AgregarHabitaciones);
api.put('/editarHabitacion/:idHabitacion', habitacionesController.EditarHabitaciones);
api.delete('/eliminarHabitacion/:idHabitacion', habitacionesController.EliminarHabitaciones);
api.get('/habitacion/:idHabitacion', habitacionesController.ObtenerHabitacionId);
api.get("/ObtnernerHabitacionesxHotel/:id", habitacionesController.ObtnernerHabitacionesxHotel);
module.exports = api;