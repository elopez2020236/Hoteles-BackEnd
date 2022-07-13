const express = require("express");
const hotelesController = require("../controllers/hoteles.controller");

const md_autenticacion = require("../middlewares/autenticacion");
const md_rol = require("../middlewares/roles");

const api = express.Router();

api.post("/agregarHotel", md_autenticacion.Auth,hotelesController.agregarHotel);
api.put("/editarHotel/:idHotel", hotelesController.editarHotel);
api.delete("/eliminarHotel/:id", hotelesController.eliminarHotel);
api.get("/verHoteles", hotelesController.verHoteles);
api.get("/verHotelesId/:idHotel", hotelesController.obtenerHotelesById);
api.get("/buscarHotelByName", hotelesController.buscarHotelByName);
api.get("/obtenerUsuarioHospedado/:idHotel", hotelesController.ObtenerusuarioHosperdado)
api.get("/obtenerHotelxGerente",md_autenticacion.Auth,hotelesController.obtenerHotelxGerente)

module.exports = api;