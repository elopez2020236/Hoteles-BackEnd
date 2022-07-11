const Usuario = require("../models/usuario.model");
const bcrypt = require("bcrypt-nodejs");
const Carrito = require("../models/carrito.model");
const jwt = require("../services/jwt");

function RegistrarAd(req, res) {
  let usuarioModelo = new Usuario();

  usuarioModelo.nombre = "SuperAdmin";
  usuarioModelo.usuario = "SuperAdmin";
  usuarioModelo.email = "Superadmin";
  usuarioModelo.rol = "ADMIN";
  usuarioModelo.password = "12345";

  Usuario.find({
    $or: [{ usuario: usuarioModelo.usuario }],
  }).exec((err, buscarUsuario) => {
    if (err) return console.log("ERROR en la peticion");

    if (buscarUsuario && buscarUsuario.length >= 1) {
      console.log("Usuario Super Admin creado con anterioridad");
    } else {
      bcrypt.hash(usuarioModelo.password, null, null, (err, passCrypt) => {
        usuarioModelo.password = passCrypt;
      });

      usuarioModelo.save((err, usuarioGuardado) => {
        if (err) return console.log("ERROR al crear el usuario Admin");

        if (usuarioGuardado) {
          console.log("Usuario Super Admin Creado");
        }
      });
    }
  });
}

function RegistrarUsuario(req, res) {
  var parametros = req.body;
  var usuarioModel = new Usuario();

  if (parametros.email && parametros.password) {
    usuarioModel.nombre = parametros.nombre;
    usuarioModel.email = parametros.email;
    usuarioModel.rol = "Usuario";

    Usuario.find({ email: parametros.email }, (err, usuarioEncontrado) => {
      if (usuarioEncontrado.length == 0) {
        bcrypt.hash(
          parametros.password,
          null,
          null,
          (err, passwordEncriptada) => {
            usuarioModel.password = passwordEncriptada;

            usuarioModel.save((err, usuarioGuardado) => {
              if(err) return res.status(500).send({ mensaje:'error en la peticion 1'});
              else if(usuarioGuardado) {
                var carritoModel = new Carrito();

                carritoModel.Usuario = usuarioGuardado._id;
                carritoModel.Habitaciones= null;
                carritoModel.Servicios = [];
                carritoModel.subTotal = null;
                carritoModel.save((err,carridoCreado)=>{

                  if(err) return res.status(500).send({ mensaje:'error en la petcion 2'});
                  else if (carridoCreado){

                    return res.status(200).send({mensaje:'se agreo el carrito y el usuario correctamente',usuarioGuardado})

                  }else{
                    return res.send({ mensaje:'error al crear carrito'})
                  }

                })


              }else{
                return res.send({ mensaje: 'error al guardar el usuario' })
              }
           });
          }
        );
      } else {
        return res
          .status(500)
          .send({ mensaje: "Este correo, ya  se encuentra utilizado" });
      }
    });
  } else {
    return res
      .status(500)
      .send({ mensaje: "Envie los parametros obligatorios" });
  }
}

function Login(req, res) {
  var parametros = req.body;
  Usuario.findOne({ email: parametros.email }, (err, usuarioEncontrado) => {
    if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
    if (usuarioEncontrado) {
      bcrypt.compare(
        parametros.password,
        usuarioEncontrado.password,
        (err, verificacionPassword) => {
          if (verificacionPassword) {
            if (parametros.obtenerToken == "true") {
              return res
                .status(200)
                .send({ token: jwt.crearToken(usuarioEncontrado) });
            } else {
              usuarioEncontrado.password = undefined;
              return res.status(200).send({ usuario: usuarioEncontrado });
            }
          } else {
            return res
              .status(500)
              .send({ mensaje: "Las contraseña no coincide" });
          }
        }
      );
    } else {
      return res
        .status(500)
        .send({ mensaje: "Error, el correo no se encuentra registrado." });
    }
  });
}

function crearGerente(req, res) {
  let parametros = req.body;
  let usuarioModel = new Usuario();

  if (parametros.nombre && parametros.email) {
    Usuario.find({ email: parametros.email }, (err, gerenteEncontrado) => {
      if (gerenteEncontrado.length > 0) {
        return res
          .status(500)
          .send({ message: "Este correo esta en uso por otro administrador" });
      } else {
        usuarioModel.nombre = parametros.nombre;
        usuarioModel.email = parametros.email;
        usuarioModel.rol = "Gerente";
        bcrypt.hash(
          parametros.password,
          null,
          null,
          (err, passwordEncriptada) => {
            usuarioModel.password = passwordEncriptada;

            usuarioModel.save((err, gerenteGuardado) => {
              if (err)
                return res
                  .status(500)
                  .send({ mensaje: "Error en la peticion" });
              if (!gerenteGuardado)
                return res
                  .status(500)
                  .send({ mensaje: "Error al guardar el gerente" });
              return res.status(200).send({ gerente: "gerenteGuardado" });
            });
          }
        );
      }
    });
  } else {
    return res
      .status(404)
      .send({ mensaje: "Debe ingresar los parametros obligatorios" });
  }
}

function EditarUsuario(req, res) {
  var idUser = req.params.idUser;
  var parametros = req.body;

  Usuario.findOne({ idUser: idUser }, (err, usuarioEncontrado) => {
    Usuario.findByIdAndUpdate(
      idUser,
      {
        $set: {
          nombre: parametros.nombre,
        },
      },
      { new: true },
      (err, usuarioActualizado) => {
        if (err)
          return res
            .status(500)
            .send({ mensaje: "Error en la peticon de editar" });
        if (!usuarioActualizado)
          return res.status(500).send({ mensaje: "Error al editar usuario" });
        return res.status(200).send({ usuario: usuarioActualizado });
      }
    );

    Usuario.findByIdAndUpdate(
      req.user.sub,
      {
        $set: {
          nombre: parametros.nombre,
        },
      },
      { new: true },
      (err, usuarioActualizado) => {
        if (err)
          return res.status(500).send({ mensaje: "Error en la peticion" });
        if (!usuarioActualizado)
          return res
            .status(500)
            .send({ mensaje: "Error al editar el Usuario" });

        return res.status(200).send({ usuario: usuarioActualizado });
      }
    );
  });
}



function ObtenerUsuario(req, res) {
  Usuario.find({}, (err, usuarioEncontrado) => {
    return res.status(200).send({ usuario: usuarioEncontrado });
  });
}

function ObtenerUsuarioId(req, res) {
  var idUsuario = req.params.idUsuario;

  Usuario.findById(idUsuario, (err, usuarioEncontrado) => {
    if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
    if (!usuarioEncontrado)
      return res.status(500).send({ mensaje: "Error al obtener Usuario" });

    return res.status(200).send({ empresa: usuarioEncontrado });
  });
}

function eliminarUsuario(req, res) {
  var idUsuario = req.params.idUsuario;

  Usuario.findById(idUsuario, (err, userFinded) => {
    if (err) {
      return res.status(500).send({ mensaje: "error en la peticion 1" });
    } else if (userFinded) {
      Usuario.findByIdAndDelete(idUsuario, (err, userRemoved) => {
        if (err) {
          return res.status(500).send({ mensaje: "error en petcion 2" });
        } else if (userRemoved) {
          return res
            .status(200)
            .send({ mensaje: "Usuario eliminado con exito", userRemoved });
        }
      });
    } else {
      return res.status(500).send({ mensaje: "error al eliminar Usuario" });
    }
  });
}

function ObtenerUsuarios(req,res){
  Usuario.find({rol:'Usuario'}, (err,usuariosEncontrados)=>{
    if(err){return res.status(500).send('error en la peticion 1');
    }else if(usuariosEncontrados){
      return res.status(200).send({usuario:usuariosEncontrados});

    }else{
      return res.send({ mensaje: 'error al obtener usuarios'})
    }
  })
}

module.exports = {
  RegistrarAd,
  Login,
  RegistrarUsuario,
  EditarUsuario,
  ObtenerUsuario,
  ObtenerUsuarioId,
  eliminarUsuario,
  crearGerente,
  ObtenerUsuarios
};
