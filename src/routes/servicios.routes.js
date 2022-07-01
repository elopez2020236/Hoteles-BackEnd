const express = require("express");
const serviciosController = require("../controllers/servicios.controllers");

const api = express.Router();

api.post("/agregarServicio", serviciosController.Agregarservicio);

module.exports = api;