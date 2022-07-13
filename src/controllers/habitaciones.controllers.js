const Habitaciones = require('../models/habitaciones.model');
const Hoteles = require('../models/hotel.model');

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
    let idHotel = req.params.id;

    if (parametros.numeroHabitacion && parametros.tipoHabitacion && parametros.precio) {
        modeloHabitaciones.numeroHabitacion = parametros.numeroHabitacion;
        modeloHabitaciones.tipoHabitacion = parametros.tipoHabitacion;
        modeloHabitaciones.numeroPiso = parametros.numeroPiso;
        modeloHabitaciones.precio = parametros.precio;
        modeloHabitaciones.estado = true
        modeloHabitaciones.numeroDias = null
        //modeloHabitaciones.idHoteles = req.user.sub;


        modeloHabitaciones.save((err, habitacionGuardado) => {
            if(err){
                return res.status(500).send({ mensaje: "error en la peticion 1"});

            }else if (habitacionGuardado){
               
                Hoteles.findByIdAndUpdate(idHotel,{$push:{Habitaciones:habitacionGuardado._id}},{new: true},
                    (err,hotelActualizado)=>{
                        if(err) return res.status(500).send({ mensaje:'error en la peticion 2'});
                        else if (hotelActualizado){
                            return res.status(200).send({ mensaje:'se creo y se agrego la habitacion correctamente',habitacionGuardado});
                        
                        }else{
                             return res.status(500).send({ mensaje:'error al agregar la habitacion al hotel'})
                        }
                    })


            }else{
                return res.status(500).send({ mensaje: 'error al guardar la habitacion'});
            }


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
        if (err){
            return res.status(500).send({ mensaje:'error en la peticion 1'});
        }else if ( habitacionEliminado){
            Hoteles.findOneAndUpdate({Habitaciones:habitacionEliminado._id},{$pull:{Habitaciones:habitacionEliminado._id}},
                (err,habitacionEliminado7)=>{
                    if(err){
                        return res.status(500).send({ mensaje:'error en la peticion 2'});
                    }if(habitacionEliminado7){
                        return res.status(200).send({ mensaje:'se elimno y removio la habitacion ',habitacionEliminado});
                    }else{
                        return res.status(500).send({ mensaje: 'error al remover la habitacion '})
                    }
                })

        }else{
            return res.status(500).send({ mensaje: 'error en al elimnar la habitacion'})
        }
;
    })
}
function ObtnernerHabitacionesxHotel(req, res){
    var idHotel = req.params.id;

    Hoteles.findById(idHotel,(err, hotelEncontrado)=>{
        if(err) {return res.status(500).send({ mensaje: "Error en la peticion 1" });
    }else if(hotelEncontrado){
        let habitaciones = hotelEncontrado.Habitaciones;
        return res.status(200).send({mensaje:'las habitaciones son ',habitaciones})
    }else{
        return res.status(500).send({ mensaje: 'error al mostrar laa habitaciones'})
    }}).populate('Habitaciones');

}


module.exports = {
    ObtenerHabitaciones,
    AgregarHabitaciones,
    EditarHabitaciones,
    EliminarHabitaciones,
    ObtenerHabitacionId,
    ObtnernerHabitacionesxHotel
}

//Rep antiguo