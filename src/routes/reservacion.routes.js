const express = require("express");
const reservacionControler = require("../controllers/reservacion.controller");

const md_autenticacion = require("../middlewares/autenticacion");

const api = express.Router();

/*api.post("/verEventos", md_autenticacion.Auth, hotelesController.ObtenerEventos);
api.delete("/eliminarEvento/:idEvento", md_autenticacion.Auth, hotelesController.EditarEventos);*/


api.post("/AgregarReservacion", md_autenticacion.Auth, reservacionControler.AgregarReservacion);
api.delete("/eliminarReservacion/:idReservacion",  md_autenticacion.Auth, reservacionControler.eliminarReservacion);
api.post("/obtenerReservaciones", md_autenticacion.Auth, reservacionControler.obtenerReservaciones);
api.put("/editarReservacion/:idReservacion",md_autenticacion.Auth, reservacionControler.editarReservacion);



module.exports = api;