const mongoose = require("mongoose");
const app = require("./app");
const usuarioController = require("./src/controllers/usuario.controller");

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/hoteles", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Se ha conectado correctamente a la base de datos.");

    usuarioController.RegistrarAd();

    app.listen(3000, function () {
      console.log(
        "Servidor de Express corriendo correctamente en el puerto 3000"
      );
    });
  })
  .catch((error) => console.log(error));
