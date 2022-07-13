const Factura = require('../models/factura.model');
const Carrito = require('../models/carrito.model');
const Usuario = require('../models/usuario.model');



function CrearFactura (req, res){
    var user = req.user.sub;

Carrito.findOne({Usuario:user},(err,carritoencontrado)=>{
    if(err){ 
        return res.status(500).send({ mensaje: "error en la petion 1"});

    }else if (carritoencontrado){
            
        var modelFactura = new Factura();
        let arrayHabitacion = carritoencontrado.Habitacion
        let arrayServicos = carritoencontrado.Servicios;
        modelFactura.Habitaciones= arrayHabitacion
        modelFactura.Servicios = arrayServicos
        modelFactura.TotalPaguar= carritoencontrado.subTotal
        modelFactura.save((err,facturaguaddad)=>{
            if(err){
                 return res.status(500).send({ mensaje:arrayHabitacion});
             }else if (facturaguaddad){
                    
                let  arrayvacio = []
                Carrito.findByIdAndUpdate(carritoencontrado._id,{$pullAll:{Habitacion:arrayHabitacion},
                    subTotal:0 },(err,carritoupdate)=>{
                    if(err){
                        return res.status(500).send({ mensaje:'error en la peticion',});

                    }else if (carritoupdate){
                        Carrito.findByIdAndUpdate(carritoencontrado._id,{$pullAll:{Servicios:arrayServicos}},(err,carritofinal7)=>{
                            if(err){
                                return res.status(500).send({ mensaje:'error en la peticion 2'});

                            }else if (carritofinal7){
                               Usuario.findByIdAndUpdate( user,{$push:{factura:facturaguaddad._id}},(err,usuarioActualizado)=>{
                                if(err){
                                    return res.status(500).send({ mensaje:'error en la peticion 3'})
                                }else if (usuarioActualizado){
                                    return res.status(200).send({ mensaje:'se creo y se agrego la factura correctamente', facturaguaddad})
                                }else{
                                    return res.status(500).send({ mensaje:'error al agregar la factura'})
                                }
                               })
                            }else{
                                return res.status(500).send({ mensaje:'error el remover el servico'});
                            }
                        })
                    }else{
                        return res.status(500).send({ mensaje:'error al remover el carrito'})
                    }
                })


           
               
             }else{
                return res.status(500).send({ mensaje:'error al agregar a la factura'})
             }
        })
             
    }else{
        return res.status(500).send({ mensaje:'error al encontrar en carrito '});
    }
})
}


function ObtnerFacturaslog(req, res){
    var user = req.user.sub;
    Usuario.findById(user,(err,usuarioEncontrado)=>{
        if(err){
            return res.status(500).send({ mensaje:'error en la peticion'})
        }else if (usuarioEncontrado){
            let facturaa = usuarioEncontrado.factura;
            return res.status(200).send({facturas:facturaa})
        
        }else{
            return res.status(500).send({ mensaje:'error al obtner el usario'})
        }
    }).populate("factura")
}

module.exports = { 
    CrearFactura,
    ObtnerFacturaslog
}