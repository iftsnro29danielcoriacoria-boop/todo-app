const express = require("express");
const cors = require("cors");
const tareaRoutes = require("./routes/tarea.routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

// Rutas correctas
app.use("/api/tareas", tareaRoutes);

// Ruta por defecto si no encuentra endpoint
app.use((req, res, next) => {
    res.status(404).json({
        status: "error",
        message: "Ruta no encontrada"
    });
});

// Middleware de manejo de errores
app.use(errorHandler);

module.exports = app;
