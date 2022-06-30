const mongoose = require('mongoose');
const Eventos = require('../models/eventos.model');


// Ver Eventos
function ObtenerEventos(req, res) {
    Eventos.find({}, (err, eventosEncontrados) => {

        return res.status(200).send({ eventos: eventosEncontrados })
    })
}

// Agregar Eventos
function AgregarEventos(req, res) {
    var parametros = req.body;
    var modeloEventos = new Eventos();

    if (nombreEvento) {
        modeloEventos.nombreEvento = parametros.nombreEvento;
        modeloHabitaciones.horaEvento = parametros.horaEvento;
        modeloEventos.fechaEvento = parametros.fechaEvento;
        modeloEventos.asistentes = parametros.asistentes;
        modeloEventos.hotel = req.user.sub;
        modeloEventos.typeEvent = req.user.sub;

        modeloEventos.save((err, eventoGuardado) => {

            if (err) return res.status(500).send({ mensaje: 'Error en la peticion ' });
            if (!eventoGuardado) return res.status(500).send({ mensaje: 'Error al agregar el evento' }); //Si no trae nada

            return res.send({ eventos: eventoGuardado });
        });
    } else {
        return res.send({ mensaje: "Debe enviar los parametros obligatorios." })
    }
}

//Editar Eventos
function EditarEventos(req, res) {
    var idEve = req.params.idEvento;
    var parametros = req.body;

    Eventos.findByIdAndUpdate(idEve, parametros, { new: true }, (err, eventoEditado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!eventoEditado) return res.status(404)
            .send({ mensaje: 'Error al Editar el Evento' });

        return res.status(200).send({ eventos: eventoEditado });
    })
}

//Eliminar Eventos
function EliminarEventos(req, res) {
    var idEve = req.params.idEvento;

    Eventos.findByIdAndDelete(idHab, (err, eventoEliminado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!habitacionEliminado) return res.status(500)
            .send({ mensaje: 'Error al eliminar el Evento' })

        return res.status(200).send({ eventos: eventoEliminado });
    })
}


module.exports = {
    ObtenerEventos,
    AgregarEventos,
    EditarEventos,
    EliminarEventos
}