const Reservacion = require('../models/reservacion.model');
const Usuario = require('../models/usuario.model');
const Habitaciones = require('../models/habitaciones.model');
const Carrito = require('../models/carrito.model');
const Hoteles = require('../models/hotel.model');


function AgregarReservacion(req, res) {
    let parametros = req.body;
    let modeloReservacion = new Reservacion();
    let hotelid = req.params.idHotel
    let habitacionid = req.params.idhabitacion;
    var user = req.user.sub;


    if (parametros.numeroDias)  {

        modeloReservacion.idUsuario= req.user.sub;
        
        modeloReservacion.save((err, reservacionGuardado) => {
          if (err){
            return res.status(500).send({ mensaje: "error "})
          }else if (reservacionGuardado){
            Habitaciones.findByIdAndUpdate(habitacionid,parametros,{ new: true},
              (err,habitacionActualizada)=>{
                if (err){ 
                  return res.status(500).send({ mensaje: "error en la perion 2"})
                }else if (habitacionActualizada){
                    Carrito.findOne({Usuario:user},(err,carritoencontrado)=>{
                      if(err){
                        return res.status(500).send({ mensaje: "error en la peticion 3"});
                       }else if (carritoencontrado){
                          
                          let preciohabitacion = habitacionActualizada.precio;
                          let dias = habitacionActualizada.numeroDias;
                          let costohabitacion = preciohabitacion*dias
                          let subtalbefore = carritoencontrado.subTotal
                          let subtotalafter = subtalbefore + costohabitacion




                          Carrito.findByIdAndUpdate(carritoencontrado._id,{subTotal:subtotalafter},
                            (err,carritoActualizado)=>{
                              if(err){
                                return res.status(500).send({ mensaje: "error en la peticion 4"});
                              }else if (carritoActualizado){
                                 Reservacion.findById(reservacionGuardado._id,(err,reservacionEncontrada)=>{
                                  if(err){ 
                                    return res.status(500).send({ mensaje: "error en la perion 5"});

                                  }else if (reservacionEncontrada){
                                    Reservacion.findByIdAndUpdate(reservacionEncontrada._id,{$push:{idHabitacion:habitacionid}},
                                      (err,reservationActualizada)=>{
                                        if(err){
                                          return res.status(500).send({ mensaje: "error en la peticion 6 "});
                                        }else if (reservationActualizada){

                                          Carrito.findByIdAndUpdate(carritoActualizado._id,{$push:{Habitacion:habitacionid}},
                                            (err,carritofinal)=>{
                                              if(err){
                                                return res.status(500).send({ mensaje: "error en la petion 7"});

                                              }else if (carritofinal){
                                                
                                                Hoteles.findOne({Habitaciones:habitacion},(err,hotelEncontrado)=>{
                                                  if (err) {
                                                    return res.status(500).send({ mensaje: "error en petiCION 8"});
                                                  }else if (hotelEncontrado){
                                                    let arrayServicos = hotelEncontrado.Servios

                                                    Carrito.findByIdAndUpdate(carritofinal._id,{$push:{Servicios:arrayServicos}},
                                                      (err,carritofinal5)=>{
                                                        if(err){
                                                          return res.status(500).send({ mensaje: "error en la peticion 9"})
                                                        }else if (carritofinal5){
                                                          return console.log("si")
                                                        }else{
                                                          return res.status(500).send({ mensaje:'error al agregar el servicio al carrito'})
                                                        }
                                                      })
                                              
                                                  }else{
                                                    return res.status(500).send({ mensaje:'error al obtener el hotel'});
                                                  }
                                                })

                                              }else{
                                                return res.status(500).send({ mensaje:'error al agregar la habitacion al carrito'});
                                              }
                                            })

                                        }else{
                                          return res.status(500).send({ mensaje:'error al agregar la reservacion '})
                                        }
                                      })
                                  }else{
                                    return res.status(500).send({ mensaje:'erro al obterner la reservacion'})
                                  }
                                 })

                              }else{
                                return res.status(500).send({ mensaje:'erro al actualizar el carrito'})
                              }
                            })
                       
                       }else{
                        return res.status(500).send({ mensaje:'error'})
                       }
                    })
                }else{
                  return res.status(200).send({ mensaje:'error al obtener la habitacion'})
                }


              })
            
          }else{
            return res.status(500).send({ mensaje:'error al guardar la reservacion'})
          }

    });

    } else {
        return res.send({ mensaje: "Debe enviar los parametros obligatorios." })
    }
}

function obtenerxhotelXhabitacion(req,res){
  var habitacion = req.params.idHabitacion;

  
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
    editarReservacion,
    obtenerxhotelXhabitacion
}
