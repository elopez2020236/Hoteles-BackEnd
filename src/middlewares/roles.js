exports.verAdmin = function(req, res, next) {
  if (req.user.rol !== "ADMIN")
    return res.status(403).send({ mensaje: "Solo puede acceder el Admin" });

  next();
}

exports.verUsuario = function(req, res, next) {
  if (req.user.rol !== "Usuario")
    return res.status(403).send({ mensaje: "Solo puede acceder el usuario" });

  next();
}

exports.verGerente = function(req, res, next) {
  if (req.user.rol !== "Gerente")
    return res.status(403).send({ mensaje: "Solo puede acceder el gerente" });

  next();
}
