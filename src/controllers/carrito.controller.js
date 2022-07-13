const Carrito = require('../models/carrito.model');


function ObternCarritodeUserLogedo(req,res){
    var user= req.user.sub;
    Carrito.findOne( {Usuario:user},(err,carritoencontrado)=>{
        if(err){
            return res.status(500).send({ mensaje:'error en la peticion 1'})
        }else if (carritoencontrado){
            return res.status(200).send({carrito:carritoencontrado});
        }else{
            return res.status(500).send({ mensaje:'error al obtener'})
        }
    }).populate("Habitacion").populate("Servicios")
}

module.exports = {
    ObternCarritodeUserLogedo
}