const express = require("express");
const serviciosController = require("../controllers/servicios.controllers");

const api = express.Router();

api.post("/agregarServicio", serviciosController.Agregarservicio);
api.put("/editarServicio/:idServicio", serviciosController.EditarServicio);
api.delete("/eliminarServicios/:idServicio", serviciosController.EliminarServicios);
module.exports = api;