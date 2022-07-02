const Reservacion = require('../models/reservacion.model');



function AgregarReservacion(req, res) {
    let parametros = req.body;
    let modeloReservacion = new Reservacion();


    if (parametros.entrada && parametros.salida)  {

        modeloReservacion.entrada = parametros.entrada;
        modeloReservacion.salida = parametros.salida;

        modeloReservacion.idUsuario = req.user.sub;

        modeloReservacion.save((err, reservacionGuardado) => {

            if (err) return res.status(500).send({ mensaje: 'Error en la peticion ' });
            if (!reservacionGuardado) return res.status(500).send({ mensaje: 'Error al agregar ' }); 

            return res.send({ reservacion: reservacionGuardado });
        });

    } else {
        return res.send({ mensaje: "Debe enviar los parametros obligatorios." })
    }
}


function editarReservacion(req, res) {
    let parametros = req.body;
    let idReservacion = req.params.idReservacion;
  
    Reservacion.findByIdAndUpdate(idReservacion,parametros,{ new: true },(err, reservacionEditada) => {
        if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
        if (!reservacionEditada)
          return res
            .status(404)
            .send({ mensaje: "Error al editar la informacion del hotel" });
  
        return res.status(200).send({ hotel: reservacionEditada });
      }
    );
  }

function eliminarReservacion(req, res) {
    let idReservacion = req.params.idReservacion;
  
    Reservacion.findByIdAndDelete(idReservacion, (err, reservacionEliminado) => {
      if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
      if (!reservacionEliminado)
        return res.status(404).send({ mensaje: "No se ha podido eliminar la reservacion" });
  
      return res.status(200).send({ reservacion: reservacionEliminado });
    });
  }



  function obtenerReservaciones(req, res) {
    Reservacion.find({}, (err, reservacionEncontrada) => {
      return res.status(200).send({ reservacion: reservacionEncontrada });
    });
  }


module.exports = {
    AgregarReservacion,
    eliminarReservacion,
    obtenerReservaciones,
    editarReservacion
}
