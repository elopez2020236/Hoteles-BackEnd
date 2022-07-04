const express = require('express');
const controladorUsuario = require('../controllers/usuario.controller');
const md_autenticacion = require('../middlewares/autenticacion');
const md_rol = require('../middlewares/roles');

const api = express.Router();

api.post('/registrarUsuario', controladorUsuario.RegistrarUsuario);
api.post('/registrar', controladorUsuario.RegistrarAd);
api.post('/crearGerente', controladorUsuario.crearGerente)
api.post('/login', controladorUsuario.Login);

api.put('/editarUsuario/:idEmpresa' ,controladorUsuario.EditarUsuario);
api.delete("/eliminarUsuario/:idUsuario",controladorUsuario.eliminarUsuario);
api.get("/obtenerUsuarioId/:idUsuario",controladorUsuario.ObtenerUsuarioId);
api.post("/verUsuario",controladorUsuario.ObtenerUsuario);







module.exports = api;