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
                Carrito.findByIdAndUpdate(carritoencontrado._id,{$pullAll:{Habitacion:arrayHabitacion},$pullAll:{Servicios:arrayServicos},
                    subTotal:0 },(err,carritoupdate)=>{
                    if(err){
                        return res.status(500).send({ mensaje:'error en la peticion'});

                    }else if (carritoupdate){
                        return console.log(carritoupdate)
                    }else{
                        return res.status(500).send({ mensaje:'error al remover el carrito'})
                    }
                })


           
                console.log(arrayvacio)
             }else{
                return res.status(500).send({ mensaje:'error al agregar a la factura'})
             }
        })
             
    }else{
        return res.status(500).send({ mensaje:'error al encontrar en carrito '});
    }
})
}

module.exports = { 
    CrearFactura,
}