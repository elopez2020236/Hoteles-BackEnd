const Factura = require('../models/factura.model');
const Carrito = require('../models/carrito.model');
const Usuario = require('../models/usuario.model');



function CrearFactura (req, res){
    var user = req.user.sub;

Carrito.findOne({Usuario:user},(err,carritoencontrado)=>{
    if(err){ 
        return res.status(500).send({ mensaje: "error en la petion 1"});

    }else if (carritoencontrado){
        
             
    }else{
        return res.status(500).send({ mensaje:'error al encontrar en carrito '});
    }
})
}

module.exports = { 
    CrearFactura,
}