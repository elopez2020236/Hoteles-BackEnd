const express = require('express');
const controladorUsuario = require('../controllers/usuario.controller');
const md_autenticacion = require('../middlewares/autenticacion');
const md_rol = require('../middlewares/roles');

const api = express.Router();

api.post('/registrarUsuario',md_autenticacion.Auth, controladorUsuario.RegistrarUsuario);
api.post('/registrar', controladorUsuario.RegistrarAd);
api.post('/crearGerente', [md_autenticacion.Auth, md_rol.verAdmin], controladorUsuario.crearGerente)
api.post('/login', controladorUsuario.Login);
api.put('/editarUsuario/:idEmpresa' ,md_autenticacion.Auth, controladorUsuario.EditarUsuario);
api.delete("/eliminarUsuario/:idUsuario",md_autenticacion.Auth, controladorUsuario.eliminarUsuario);
api.get("/obtenerUsuarioId/:idUsuario",md_autenticacion.Auth, controladorUsuario.ObtenerUsuarioId);
api.get("/verUsuario/:idUsuario",md_autenticacion.Auth, controladorUsuario.VerUsuario);




module.exports = api;