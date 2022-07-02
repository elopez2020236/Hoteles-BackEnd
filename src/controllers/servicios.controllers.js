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

function EditarServicio(req, res) {
    let parametros = req.body;
    let idServi = req.params.idServicio;

    Servicios.findByIdAndUpdate(idServi, parametros, { new: true }, (err, servicioEditado) => {
        if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
        if (!servicioEditado)
            return res
                .status(404)
                .send({ mensaje: "Error al editar la informacion del hotel" });

        return res.status(200).send({ servicios: servicioEditado });
    });
}

function EliminarServicios(req, res) {
    var idServicio = req.params.idServicio;

    Servicios.findByIdAndDelete(idServicio, (err, servicioEliminado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!servicioEliminado) return res.status(500)
            .send({ mensaje: 'Error al eliminar el Servicio' })

        return res.status(200).send({ servicio: servicioEliminado });
    })
}

function ObtenerServicios(req, res) {
    Servicios.find({}, (err, serviciosEncontrados) => {

        return res.status(200).send({ servicios: serviciosEncontrados })
    })
}
module.exports = {
    Agregarservicio,
    EditarServicio,
    EliminarServicios,
    ObtenerServicios
}