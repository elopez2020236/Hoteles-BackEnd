const express = require("express");
const reservacionControler = require("../controllers/reservacion.controller");

const md_autenticacion = require("../middlewares/autenticacion");

const api = express.Router();

/*api.post("/verEventos", md_autenticacion.Auth, hotelesController.ObtenerEventos);
api.delete("/eliminarEvento/:idEvento", md_autenticacion.Auth, hotelesController.EditarEventos);*/


api.post("/AgregarReservacion/:idhabitacion", md_autenticacion.Auth, reservacionControler.AgregarReservacion);
api.delete("/eliminarReservacion/:idReservacion",  md_autenticacion.Auth, reservacionControler.eliminarReservacion);
api.get("/obtenerReservacionesxHotel/:idHotel", md_autenticacion.Auth, reservacionControler.obtenerReservacionesxHotel);
api.put("/editarReservacion/:idReservacion",md_autenticacion.Auth, reservacionControler.editarReservacion);
api.get("/prueba/:idHabitacion", md_autenticacion.Auth,reservacionControler.obtenerxhotelXhabitacion)
api.get("/obtnerTodasLasReservaciones", md_autenticacion.Auth)


module.exports = api;