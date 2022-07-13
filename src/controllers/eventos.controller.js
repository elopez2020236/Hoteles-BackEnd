const mongoose = require('mongoose');
const Eventos = require('../models/eventos.model');
const Hoteles = require('../models/hotel.model');

//Ver Eventos
function ObtenerEventos(req, res) {
    Eventos.find({}, (err, eventosEncontrados) => {

        return res.status(200).send({ eventos: eventosEncontrados })
    })
}


//Obtener un evento en específico
function ObtenerEventoId(req, res) {
    const idEve = req.params.idEvento;

    Eventos.findById(idEve, (err, eventoEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Erro en la peticion' });
        if (!eventoEncontrado) return res.status(500).send({ mensaje: 'Error al obtener el evento' });

        return res.status(200).send({ eventos: eventoEncontrado });
    })
}

// Agregar Eventos
function AgregarEventos(req, res) {
    var parametros = req.body;
    var hotelid = req.params.idHotel;
    var modeloEventos = new Eventos();

    if (parametros.nombre, parametros.hora, parametros.fecha) {
        modeloEventos.nombre = parametros.nombre;
        modeloEventos.hora = parametros.hora;
        modeloEventos.fecha = parametros.fecha;
        modeloEventos.save((err, eventoGuardado) => {
            if(err){
                return res.status(500).send({ mensaje:'error en la peticion'});

            }else if(eventoGuardado){
    var hotelid = req.params.idHotel;
                Hoteles.findByIdAndUpdate(hotelid, {$push:{Eventos:eventoGuardado._id}},{new: true},(err,eventoUpdated)=>{
                    if(err){
                        return res.status(500).send({ mensaje:'error en la peticion 2'})

                    }else if (eventoUpdated){
                        return res.status(200).send({ mensaje:'se agrego y se creo el evento correctamente',eventoGuardado})
                    }else{
                        return res.status(500).send({ mensaje:'error al agregar el eveto al hotel'})
                    }
                })

            }else{
                return res.status(500).send({ mensaje:'error al guardar el evento'})
            }
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

    Eventos.findByIdAndDelete(idEve, (err, eventoEliminado) => {
        if (err){
            return res.status(500).send({ mensaje:'error en la peticion'})
        }else if (eventoEliminado){
            Hoteles.findOneAndUpdate({Eventos:eventoEliminado._id},{$pull:{Eventos:eventoEliminado._id}},(err,hotelActualizado)=>{
                if(err){
                    return res.status(500).send({ mensaje:'error en la peticion 2'})
                }else if (hotelActualizado){
                    return res.status(200).send({ mensaje:'se elimino y removio el evento',eventoEliminado})
                }else{
                    return res.status(500).send({ mensaje:'error al remover el evento'})
                }
            })    
        }else{
            return res.status(500).send({ mensaje:'error al eliminar el evento'})
        }

    })
}

function ObtenerEventosxHotel(req, res){
    var hotel= req.params.idHotel;

    Hoteles.findById(hotel, (err, hotelEncontrado)=>{
        if(err){
            return res.status(500).send({ mensaje:'error en la peticion 1'});
        }else if (hotelEncontrado){
             let array =hotelEncontrado.Eventos;
             return res.status(200).send({Eventos:array})
        }else{
            return res.status(500).send({ mensaje:'error al obtener los eventos'})
        }
    }).populate("Eventos")

}


module.exports = {
    ObtenerEventos,
    AgregarEventos,
    EditarEventos,
    EliminarEventos,
    ObtenerEventoId,
    ObtenerEventosxHotel
}