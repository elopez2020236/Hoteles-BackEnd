const express = require("express");
const hotelesController = require("../controllers/hoteles.controller");

const md_autenticacion = require("../middlewares/autenticacion");
const md_rol = require("../middlewares/roles");

const api = express.Router();

api.post("/agregarHotel", [md_autenticacion.Auth, md_rol.verAdmin], hotelesController.agregarHotel);
api.put("/editarHotel/:idHotel", md_autenticacion.Auth, hotelesController.editarHotel);
api.delete("/eliminarHotel/:id", [md_autenticacion.Auth, md_rol.verAdmin], hotelesController.eliminarHotel);
api.get("/verHoteles", md_autenticacion.Auth, hotelesController.verHoteles);
api.get("/verHotelesId/:idHotel", [md_autenticacion.Auth, md_rol.verAdmin], hotelesController.obtenerHotelesById);
api.get("/buscarHotelByName", md_autenticacion.Auth, hotelesController.buscarHotelByName);


module.exports = api;