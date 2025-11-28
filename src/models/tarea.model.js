const mongoose = require("mongoose");

const tareaSchema = new mongoose.Schema({
  idTarea: { type: Number, required: true, unique: true },
  titulo: { type: String, required: true },
  descripcion: { type: String },
  fecha: { type: Date },
  completada: { type: Boolean, default: false }
});

// "Tarea" es el modelo, "Tarea" es el nombre exacto de la colección en MongoDB Atlas
module.exports = mongoose.model("Tarea", tareaSchema, "Tarea");
