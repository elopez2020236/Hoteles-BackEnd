const express = require("express");
const serviciosController = require("../controllers/servicios.controllers");

const md_autenticacion = require("../middlewares/autenticacion");
const md_rol = require("../middlewares/roles");

const api = express.Router();

api.get("/verServicios", [md_autenticacion.Auth, md_rol.verServicios], serviciosController.ObtenerServicios);
api.post("/agregarServicio",md_autenticacion.Auth, serviciosController.Agregarservicio);
api.put("/editarServicio/:idServicio",md_autenticacion.Auth, serviciosController.EditarServicio);
api.delete("/eliminarServicio/:idServicio", md_autenticacion.Auth,serviciosController.EliminarServicios);
api.get('/servicio/:idServicio', serviciosController.ObtenerServicioId);

module.exports = api;