const express = require("express");
const cors = require("cors");
const app = express();

// IMPORTACION RUTAS
//const usuarioRoutes = require("./src/routes/usuario.routes");
const hotelesRoutes = require("./src/routes/hotel.routes");
const habitacionesRoutes = require("./src/routes/habitaciones.routes");
const eventosRoutes = require("./src/routes/eventos.routes");
const userRoutes = require("./src/routes/usuario.routes");
const reservacion = require("./src/routes/reservacion.routes");

// MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CABECERAS
app.use(cors());

// CARGA DE RUTAS localhost:3000/api/productos
app.use("/api", hotelesRoutes, userRoutes, habitacionesRoutes, eventosRoutes, reservacion);

module.exports = app;
