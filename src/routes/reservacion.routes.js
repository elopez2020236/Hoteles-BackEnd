const express = require("express");
const reservacionControler = require("../controllers/reservacion.controller");

const md_autenticacion = require("../middlewares/autenticacion");

const api = express.Router();

/*api.post("/verEventos", md_autenticacion.Auth, hotelesController.ObtenerEventos);
api.delete("/eliminarEvento/:idEvento", md_autenticacion.Auth, hotelesController.EditarEventos);*/


api.post("/AgregarReservacion", md_autenticacion.Auth, reservacionControler.AgregarReservacion);
api.delete("/eliminarReservacion/:idReservacion",  reservacionControler.eliminarReservacion);
api.post("/obtenerReservaciones",  reservacionControler.obtenerReservaciones);
api.put("/editarReservacion/:idReservacion",reservacionControler.editarReservacion);



module.exports = api;