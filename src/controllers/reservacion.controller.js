const Reservacion = require('../models/reservacion.model');
const Usuario = require('../models/usuario.model');
const Habitaciones = require('../models/habitaciones.model');
const Carrito = require('../models/carrito.model');
const Hoteles = require('../models/hotel.model');
const Servicios = require('../models/servicios.model')


function AgregarReservacion(req, res) {
    let parametros = req.body;
    let modeloReservacion = new Reservacion();
    let hotelid = req.params.idHotel
    let habitacionid = req.params.idhabitacion;
    var user = req.user.sub;


    if (parametros.numeroDias)  {


      Hoteles.findOne({Habitaciones:habitacionid},(err,hotelfined)=>{
        if (err){
          return res.status(500).send({ mensaje: "error "})
        }else if (hotelfined){
          var hotelid = hotelfined._id
      
        modeloReservacion.idUsuario= req.user.sub;
        modeloReservacion.idHotel = hotelid;
        modeloReservacion.numeroDias = parametros.numeroDias;
        modeloReservacion.estado= false;
        
        modeloReservacion.save((err, reservacionGuardado) => {
          if (err){
            return res.status(500).send({ mensaje: "error "})
          }else if (reservacionGuardado){
            Habitaciones.findByIdAndUpdate(habitacionid,{numeroDias:reservacionGuardado.numeroDias,estado:false},{ new: true},
              (err,habitacionActualizada)=>{
                if (err){ 
                  return res.status(500).send({ mensaje: "error en la perion 2"})
                }else if (habitacionActualizada){
                    Carrito.findOne({Usuario:user},(err,carritoencontrado)=>{
                      if(err){
                        return res.status(500).send({ mensaje: "error en la peticion 3"});
                       }else if (carritoencontrado){
                          
                          let preciohabitacion = habitacionActualizada.precio;
                          let dias = reservacionGuardado.numeroDias;
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
                                                
                                                Hoteles.findOne({Habitaciones:habitacionid},(err,hotelEncontrado)=>{
                                                  if (err) {
                                                    return res.status(500).send({ mensaje: "error en petiCION 8"});
                                                  }else if (hotelEncontrado){
                                                    let arrayServicos = hotelEncontrado.Servios

                                                    Carrito.findByIdAndUpdate(carritofinal._id,{$push:{Servicios:arrayServicos}},
                                                      (err,carritofinal5)=>{
                                                        if(err){
                                                          return res.status(500).send({A:arrayServicos})
                                                        }else if (carritofinal5){


                                                            for(i=0;i<=arrayServicos.length;i++){

                                                              Servicios.findById(arrayServicos[i],(err,servicioEncontrado)=>{
                                                                if(err){
                                                                  return res.status(500).send({ mensaje: "error en la perion 9"});
                                                                }else if (servicioEncontrado){

                                                                 let costoServicio = servicioEncontrado.costoServicio;
                                                                 let Subtalreal = subtotalafter + costoServicio;

                                                                 Carrito.findByIdAndUpdate(carritofinal5._id,{subTotal:Subtalreal},(err,Ultimocarrito)=>{
                                                                    if(err){
                                                                        return res.status(500).send({ mensaje: "error en la peticion 10"});
                                                                    }else if (Ultimocarrito){

                                                                   
                                                                      Hoteles.findByIdAndUpdate(hotelEncontrado._id,{$push:{Huespedes:user}},(err,hotelActualizado)=>{
                                                                        if(err){
                                                                          return res.status(500).send({ mensaje: "error en peticion 11"});
                                                                        }else if (hotelActualizado){

                                                                                                                  
                                                                          Habitaciones.findByIdAndUpdate(habitacionid,{numeroDias:parametros.numeroDias},(err,habitacionesAc)=>{
                                                                            if(err){
                                                                              return res.status(500).send({ mensaje:'error en la peticion'})
                                                                            }else if (habitacionesAc){
                                                                              return res.status(200).send({ mensaje:'los procesos de la reservacion se hicieron con exito',reservacionGuardado});
                                                                            }else{
                                                                              return res.status(500).send({ mensaje:'error al agregar el numero dias'})
                                                                            }
                                                                          })

                                                                        }else{
                                                                         
                                                                        }
                                                                      })
                                                                      
                                                                    }else{
                                                                      return res.status(500).send({ mensaje:'no se actualizo el carrito'})
                                                                    }
                                                                 })
                                                                 
                                                                 

                                                                
                                                                }else{
                                                                
                                                                }
                                                              })

                                                            }
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
  }
})

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



  function obtenerReservacionesxHotel(req, res) {
    var hotel = req.params.idHotel;

    Reservacion.find({idHotel:hotel},(err,reservacion)=>{
      return res.status(200).send({reservacion: reservacion})
    })
   
  }

  function obtenerReservacion(req, res){
    Reservacion.find((err,reservacionesEncontrada)=>{
      if(err){
        return res.status(500).send({ mensaje:'error en la peticion'});

      }else if (reservacionesEncontrada){
        return res.status(200).send({ mensaje:reservacionesEncontrada})
      }else{
        return res.status(500).send({ mensaje:'error al obtner la reservacion'})
      }
    })
  }


module.exports = {
    AgregarReservacion,
    eliminarReservacion,
    obtenerReservacionesxHotel,
    editarReservacion,
    obtenerxhotelXhabitacion,
    obtenerReservacion
}
