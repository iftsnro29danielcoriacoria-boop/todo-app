const tareaService = require("../services/tarea.service");

// Obtener todas
exports.getTodos = async (req, res) => {
  try {
    const tareas = await tareaService.getAll();
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
};

// Obtener por idTarea
exports.getTodo = async (req, res) => {
  try {
    const idTarea = req.params.id;
    if (isNaN(idTarea)) return res.status(400).json({ error: "idTarea debe ser numérico" });

    const tarea = await tareaService.getByIdTarea(idTarea);
    if (!tarea) return res.status(404).json({ error: "Tarea no encontrada" });

    res.json(tarea);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la tarea" });
  }
};

// Crear tarea
exports.createTodo = async (req, res) => {
  try {
    const nueva = await tareaService.create(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    if (error.code === 11000)
      return res.status(409).json({ error: "idTarea ya existe" });

    res.status(500).json({ error: "Error al crear la tarea" });
  }
};

// Actualizar
exports.updateTodo = async (req, res) => {
  try {
    const idTarea = req.params.id;
    if (isNaN(idTarea)) return res.status(400).json({ error: "idTarea debe ser numérico" });

    const updated = await tareaService.update(idTarea, req.body);
    if (!updated) return res.status(404).json({ error: "Tarea no encontrada" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la tarea" });
  }
};

// Eliminar
exports.deleteTodo = async (req, res) => {
  try {
    const idTarea = req.params.id;
    if (isNaN(idTarea)) return res.status(400).json({ error: "idTarea debe ser numérico" });

    const deleted = await tareaService.remove(idTarea);
    if (!deleted) return res.status(404).json({ error: "Tarea no encontrada" });

    res.json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la tarea" });
  }
};
