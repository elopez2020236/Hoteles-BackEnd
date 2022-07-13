const mongoose = require('mongoose');
const Servicios = require('../models/servicios.model');
const Hotel = require('../models/hotel.model');


//Ver Servicios
function ObtenerServicios(req, res) {
    Servicios.find({}, (err, serviciosEncontrados) => {

        return res.status(200).send({ servicios: serviciosEncontrados })
    })
}

//Obtener una solo un servicio
function ObtenerServicioId(req, res) {
    const idServi = req.params.idServicio;

    Servicios.findById(idServi, (err, servicioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Erro en la peticion' });
        if (!servicioEncontrado) return res.status(500).send({ mensaje: 'Error al obtener el servicio' });

        return res.status(200).send({ servicios: servicioEncontrado });
    })
}

//Agregar Servicios
function Agregarservicio(req, res) {
    var hotel= req.params.idHotel;
    let parametros = req.body;

    let modeloServicios = new Servicios();


    if (parametros.nombreServicio && parametros.costoServicio) {
        modeloServicios.nombreServicio = parametros.nombreServicio;
        modeloServicios.costoServicio = parametros.costoServicio;
        


        modeloServicios.save((err, servicioGuardado) => {

            if(err){
                return res.status(500).send({ mensaje: "error en la peticion 1"});

            }else if (servicioGuardado){

                Hotel.findByIdAndUpdate(hotel,{$push:{Servios:servicioGuardado._id}},
                    (err,hotelActualizado)=>{
                        if(err){
                            return res.status(500).send({ mensaje: "error en la peticion 2"});
                        }else if (hotelActualizado){
                                return res.status(200).send({ mensaje:'se creo y agrego el servicio correctamente',servicioGuardado})
                        }else{
                            return res.status(500).send({ mensaje:'error al agregar el servicio '})
                        }
                    })
            }else{
                return res.status(500).send({ mensaje:'error al guardar el servcio'})
            }
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
        if(err){
            return res.status(500).send({ mensaje: "error en la peticion 1"})

        }else if (servicioEliminado){
            Hotel.findOneAndUpdate({Servios:idServicio},{$pull:{Servios:idServicio}},(err,hotelActualizado)=>{
                if(err){
                    return res.status(500).send({ mensaje: "error en la peticion 2"});
                }else if(hotelActualizado){
                    return res.status(200).send({ mensaje:'se removo el servicio correctamente',servicioEliminado});
                }else{
                    return res.status(500).send({ mensaje:'error al remover el servicio del hotel'})
                }
            })
        }else{
            return res.status(500).send({ mensaje:'error al elimianr le servicios'});
        }
    })
}

function obtenerservicioxHotel (req, res) {
 var hotel= req.params.idHotel;

 Hotel.findById(hotel,(err, hotelEncontrado)=>{
    if (err){
        return res.status(500).send({ mensaje: "error en la peticion 1"});
    }else if (hotelEncontrado){
        let arratser= hotelEncontrado.Servios
        return res.status(200).send({mensaje:'las habitaciones son ',arratser})


    }else{
        return res.status(500).send({ mensaje:'error al obtener los servicos'})
    }


 }).populate("Servios")

}
module.exports = {
    ObtenerServicios,
    Agregarservicio,
    EditarServicio,
    EliminarServicios,
    ObtenerServicioId,
    obtenerservicioxHotel

}