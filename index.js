const mongoose = require("mongoose");
require('dotenv').config();

const app = require("./app");
const usuarioController = require("./src/controllers/usuario.controller");

mongoose.Promise = global.Promise;
mongoose
  .connect( process.env.CONNECT_DB , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Se ha conectado correctamente a la base de datos.");

    usuarioController.RegistrarAd();

      const PORT = process.env.PORT || 3000
    app.listen(PORT, function () {
      console.log(
        'El servidor está levantado en el puerto '+PORT 
      );
    });
  })
  .catch((error) => console.log(error));
