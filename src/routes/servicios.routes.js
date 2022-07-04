const express = require("express");
const serviciosController = require("../controllers/servicios.controllers");

const api = express.Router();

api.post("/agregarServicio", serviciosController.Agregarservicio);
api.put("/editarServicio/:idServicio", serviciosController.EditarServicio);
api.delete("/eliminarServicio/:idServicio", serviciosController.EliminarServicios);
api.get("/verServicios", serviciosController.ObtenerServicios);
api.get('/servicio/:idServicio', serviciosController.ObtenerServicioId);

module.exports = api;