const TipoEvento = require("../models/tipoEvento.model");

//Agregar Tipo Evento 

function AgregarTipoEvento(req, res) {
    let parametros = req.body;
    let modeloTipoEvento = new TipoEvento();

    if (parametros.tipoEvento)  {

        modeloTipoEvento.tipoEvento = parametros.tipoEvento;     

        modeloTipoEvento.save((err, tipoEventoGuardado) => {

            if (err) return res.status(500).send({ mensaje: 'Error en la peticion ' });
            if (!tipoEventoGuardado) return res.status(500).send({ mensaje: 'Error al agregar ' }); 

            return res.send({ tipoEvento: tipoEventoGuardado });
        });

    } else {
        return res.send({ mensaje: "Debe enviar los parametros obligatorios." })
    }
}

function EditarTipoEvento(req, res) {
    let parametros = req.body;
    let idTipoevento = req.params.idTipoEvento;

    TipoEvento.findByIdAndUpdate(idTipoevento,parametros,{ new: true },(err, tipoEventoEditado) => {
        if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
        if (!tipoEventoEditado)
          return res.status(404).send({ mensaje: "Error al editar la informacion del Tipo Evento" });

        return res.status(200).send({ tipoEvento: tipoEventoEditado });
      }
    );
  }

// Ver TipoEvento
function ObtenerTipoEvento(req, res) {
    TipoEvento.find({}, (err, tipoEventoEncontrados) => {
        return res.status(200).send({ eventos: tipoEventoEncontrados })
    })
}


//Eliminar TipoEvento
function eliminarTipoEvento(req, res) {
    let idTipoEvento = req.params.idTipoEvento;

    TipoEvento.findByIdAndDelete(idTipoEvento, (err, tipoEventoEliminado) => {
      if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
      if (!tipoEventoEliminado)
       return res.status(404).send({ mensaje: "No se ha podido eliminar el Tipo Evento" });

      return res.status(200).send({ tipoEvento: tipoEventoEliminado });
    });
  }

module.exports = {
    AgregarTipoEvento,
    EditarTipoEvento,
    eliminarTipoEvento,
    ObtenerTipoEvento
  };
