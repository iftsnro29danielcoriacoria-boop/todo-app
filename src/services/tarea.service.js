const Tarea = require("../models/tarea.model");

// Obtener todas las tareas
exports.getAll = async () => {
  // No poner filtros para debug; si querés luego agregás paginación/orden
  return Tarea.find().sort({ idTarea: 1 }).lean();
};

// Obtener por ObjectId (si alguna vez lo necesitás)
exports.getById = async (id) => {
  return Tarea.findById(id).lean();
};

// Obtener por idTarea (numérico)
exports.getByIdTarea = async (idTarea) => {
  return Tarea.findOne({ idTarea: Number(idTarea) }).lean();
};

// Crear tarea
exports.create = async (data) => {
  // Asegurarse de transformar fecha si viene como string
  if (data.fecha) data.fecha = new Date(data.fecha);
  // Si idTarea no viene, podríamos calcular el siguiente:
  if (!data.idTarea) {
    const last = await Tarea.findOne().sort({ idTarea: -1 }).select("idTarea").lean();
    data.idTarea = last ? last.idTarea + 1 : 1;
  } else {
    data.idTarea = Number(data.idTarea);
  }
  const nueva = new Tarea(data);
  return nueva.save();
};

// Actualizar por idTarea (numérico)
exports.update = async (idTarea, data) => {
  if (data.fecha) data.fecha = new Date(data.fecha);
  return Tarea.findOneAndUpdate({ idTarea: Number(idTarea) }, data, { new: true }).lean();
};

// Eliminar por idTarea
exports.remove = async (idTarea) => {
  const res = await Tarea.findOneAndDelete({ idTarea: Number(idTarea) }).lean();
  return res;
};
