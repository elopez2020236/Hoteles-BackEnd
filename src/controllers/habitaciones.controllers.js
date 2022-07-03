const Habitaciones = require('../models/habitaciones.model');

//Ver habitaciones
function ObtenerHabitaciones(req, res) {
    Habitaciones.find({}, (err, habitacionesEncontrados) => {

        return res.status(200).send({ habitaciones: habitacionesEncontrados })
    })
}


//Obtener una solo habitación
function ObtenerHabitacionId(req, res) {
    const idHab = req.params.idHabitacion;

    Habitaciones.findById(idHab, (err, habitacionEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Erro en la peticion' });
        if (!habitacionEncontrado) return res.status(500).send({ mensaje: 'Error al obtener la habitacion' });

        return res.status(200).send({ habitacion: habitacionEncontrado });
    })
}


// Agregar habitaciones
function AgregarHabitaciones(req, res) {
    let parametros = req.body;
    let modeloHabitaciones = new Habitaciones();

    if (parametros.numeroHabitacion && parametros.tipoHabitacion && parametros.precio) {
        modeloHabitaciones.numeroHabitacion = parametros.numeroHabitacion;
        modeloHabitaciones.tipoHabitacion = parametros.tipoHabitacion;
        modeloHabitaciones.numeroPiso = parametros.numeroPiso;
        modeloHabitaciones.precio = parametros.precio;
       // modeloHabitaciones.idHoteles = req.user.sub;

        modeloHabitaciones.save((err, habitacionGuardado) => {

            if (err) return res.status(500).send({ mensaje: 'Error en la peticion ' });
            if (!habitacionGuardado) return res.status(500).send({ mensaje: 'Error al agregar la habitación' }); //Si no trae nada

            return res.send({ habitaciones: habitacionGuardado });
        });
    } else {
        return res.send({ mensaje: "Debe enviar los parametros obligatorios." })
    }
}

// Editar Habitaciones
function EditarHabitaciones(req, res) {
    let idHab = req.params.idHabitacion;
    let parametros = req.body;

    Habitaciones.findByIdAndUpdate(idHab, parametros, { new: true }, (err, habitacionEditado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!habitacionEditado) return res.status(404)
            .send({ mensaje: 'Error al Editar la habitación' });

        return res.status(200).send({ habitaciones: habitacionEditado });
    });
}

// Eliminar habitaciones
function EliminarHabitaciones(req, res) {
    let idHab = req.params.idHabitacion;

    Habitaciones.findByIdAndDelete(idHab, (err, habitacionEliminado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!habitacionEliminado) return res.status(500)
            .send({ mensaje: 'Error al eliminar el producto' })

        return res.status(200).send({ habitaciones: habitacionEliminado });
    })
}


module.exports = {
    ObtenerHabitaciones,
    AgregarHabitaciones,
    EditarHabitaciones,
    EliminarHabitaciones,
    ObtenerHabitacionId
}

//Rep antiguo