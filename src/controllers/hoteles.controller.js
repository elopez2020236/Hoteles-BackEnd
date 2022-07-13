const Hoteles = require("../models/hotel.model");
const Usuario = require("../models/usuario.model")
//Agregar Hoteles
function agregarHotel(req, res) {
    let parametros = req.body;
    let hotelesModel = new Hoteles();

    if (parametros.nombre && parametros.direccion && parametros.telefono) {
        Hoteles.find({ nombre: parametros.nombre }, (err, hotelEncontrado) => {
            if (hotelEncontrado.length > 0) {
                return res.status(500).send({ mensaje: "Este hotel ya se ha registrado" });
            } else {
                hotelesModel.nombre = parametros.nombre;
                hotelesModel.direccion = parametros.direccion;
                hotelesModel.telefono = parametros.telefono;
                hotelesModel.idGerente = req.user.sub;

                hotelesModel.save((err, hotelGuardado) => {
                    if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
                    if (!hotelGuardado) return res.status(500).send({ mensaje: "Error al guardar el usuario" });
                    return res.send({ hotel: hotelGuardado });
                });
            }
        });
    } else {
        return res
            .status(500)
            .send({ mensaje: "Debe mandar parametros obligatorios" });
    }
}

function editarHotel(req, res) {
    let parametros = req.body;
    let idHotel = req.params.idHotel;

    Hoteles.findByIdAndUpdate(idHotel, parametros, { new: true }, (err, hotelEditado) => {
        if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
        if (!hotelEditado) return res.status(404).send({ mensaje: "Error al editar la informacion del hotel" });

        return res.status(200).send({ hotel: hotelEditado });
    });
}

//Eliminar Hotel
function eliminarHotel(req, res) {
    let idHotel = req.params.id;

    Hoteles.findByIdAndDelete(idHotel, (err, hotelEliminado) => {
        if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
        if (!hotelEliminado)
            return res
                .status(404)
                .send({ mensaje: "No se ha podido eliminar el hotel" });

        return res.status(200).send({ hotel: hotelEliminado });
    });
}

function verHoteles(req, res) {
    Hoteles.find({}, (err, hotelEncontrado) => {
        return res.status(200).send({ hotel: hotelEncontrado });
    });
}

function obtenerHotelesById(req, res) {
    let idHotel = req.params.idHotel;

    Hoteles.findById(idHotel, (err, hotelEncontrado) => {
        if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
        if (!hotelEncontrado)
            return res.status(404).send({ mensaje: "Error al obtener el hotel" });
        return res.status(200).send({ hotel: hotelEncontrado });
    });
}

function buscarHotelByName(req, res) {
    let nombreHotel = req.body.nombre;
    if (nombreHotel) {
        Hoteles.find({ nombre: { $regex: nombreHotel } },
            (err, hotelEncontrado) => {
                if (hotelEncontrado == "") {
                    return res
                        .status(404)
                        .send({ mensaje: "No hay hotees con este nombre" });
                } else {
                    return res.status(200).send({ hotel: hotelEncontrado });
                }
            }
        );
    } else {
        return res
            .status(404)
            .send({ mensaje: "Debe enviar los parametros obligatorios" });
    }
}



function obtenerHotelxGerente(req,res){
    Hoteles.find({idGerente:req.user.sub},(err, hotelesEncontrado)=>{
        if(err){
            return res.status(500).send({ mensaje:'error en la petion'});
        }else if (hotelesEncontrado){
            return res.status(200).send({hoteles:hotelesEncontrado})
        }else{
            return res.status(500).send({ mensaje:'error al obtener los hoteles'});
        }
    })
}

function ObtenerusuarioHosperdado (req,res){
    var nombreuser = req.body;
    var hotelid = req.params.idHotel;

    Usuario.findOne({nombre:nombreuser.nombre}, (err, usuarioEncontrado)=>{
        if (err) {
            return res.status(500).send({ mensaje:'error en la peticion 1'})
        }else if (usuarioEncontrado){

            Hoteles.findById(hotelid,(err,hotelEncontrado)=>{
                if(err){
                    return res.status(500).send({ mensaje: "error en la peticion 1"});
        
                }else if (hotelEncontrado){
                   let arrayHuesped = hotelEncontrado.Huespedes

                   if(arrayHuesped.includes(usuarioEncontrado._id)){

                    return res.status(200).send({mesaje:'El usuario se encuentra registrado ',usuarioEncontrado});

                   }else{
                    return res.status(500).send({ mensaje:'el usario no se encuentra hosperdo'})
                   }


                }else{
                    return res.status(500).send({ mensaje:'el usuario no se encuetra hospedado en su hotel'});
                }
            })
        }else{
            return res.status(500).send({ mensaje:'el usuario no existe o no esta registrado'})
        }
    })
   

  }
module.exports = {
    agregarHotel,
    editarHotel,
    eliminarHotel,
    verHoteles,
    buscarHotelByName,
    obtenerHotelesById,
    ObtenerusuarioHosperdado,
    obtenerHotelxGerente
};