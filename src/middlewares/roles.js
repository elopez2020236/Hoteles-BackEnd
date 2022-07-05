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

exports.verHoteles = function(req, res, next) {
    var autorizados = ['ADMIN', 'Usuario', 'Gerente'];

    if (!autorizados.includes(req.user.rol))
        return res.status(403).send({ mensaje: "Solo puede acceder el gerente" });

    next();
}

exports.verHabitaciones = function(req, res, next) {
    var autorizados = ['ADMIN', 'Usuario', 'Gerente'];

    if (!autorizados.includes(req.user.rol))
        return res.status(403).send({ mensaje: "Solo puede acceder el gerente" });

    next();
}

exports.verEventos = function(req, res, next) {
    var autorizados = ['ADMIN', 'Usuario', 'Gerente'];

    if (!autorizados.includes(req.user.rol))
        return res.status(403).send({ mensaje: "Solo puede acceder el gerente" });

    next();
}

exports.verServicios = function(req, res, next) {
    var autorizados = ['ADMIN', 'Usuario', 'Gerente'];

    if (!autorizados.includes(req.user.rol))
        return res.status(403).send({ mensaje: "Solo puede acceder el gerente" });

    next();
}