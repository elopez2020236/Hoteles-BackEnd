const express = require("express");
const hotelesController = require("../controllers/habitaciones.controllers");

const md_autenticacion = require("../middlewares/autenticacion");

const api = express.Router();

api.get('/verHabitaciones', md_autenticacion.Auth,hotelesController.ObtenerHabitaciones);
api.post('/agregarHabitacion', md_autenticacion.Auth, hotelesController.AgregarHabitaciones);
api.put('/editarHabitacion/:idHabitacion',md_autenticacion.Auth, hotelesController.EditarHabitaciones);
api.delete('/eliminarHabitacion/:idHabitacion', md_autenticacion.Auth,hotelesController.EliminarHabitaciones);
api.get('/habitacion/:idHabitacion', md_autenticacion.Auth,hotelesController.ObtenerHabitacionId);

module.exports = api;

//api.get('/verHabitaciones', md_autenticacion.Auth, hotelesController.ObtenerHabitaciones);