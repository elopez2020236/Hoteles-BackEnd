const mongoose = require('mongoose');
const Servicios = require('../models/servicios.model');

function Agregarservicio(req, res) {
    let parametros = req.body;
    let modeloServicios = new Servicios();


    if (parametros.nombreServicio && parametros.costoServicio) {

        modeloServicios.nombreServicio = parametros.nombreServicio;
        modeloServicios.costoServicio = parametros.costoServicio;


        modeloServicios.save((err, servicioGuardado) => {

            if (err) return res.status(500).send({ mensaje: 'Error en la peticion ' });
            if (!servicioGuardado) return res.status(500).send({ mensaje: 'Error al agregar ' });

            return res.send({ servicios: servicioGuardado });
        });

    } else {
        return res.send({ mensaje: "Debe enviar los parametros obligatorios." })
    }
}




module.exports = {
    Agregarservicio
}