const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
require("dotenv").config();

describe("API Tareas CRUD", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  // Generamos un idTarea único para evitar conflictos
  const uniqueIdTarea = Math.floor(Date.now() / 1000); 
  let newTaskId;

  it("Debe crear una nueva tarea", async () => {
    const res = await request(app)
      .post("/api/tareas")
      .send({ 
        idTarea: uniqueIdTarea, 
        titulo: "Tarea Test", 
        descripcion: "Descripción de prueba" 
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.titulo).toBe("Tarea Test");
    newTaskId = res.body.idTarea;
  });

  it("Debe obtener la tarea creada", async () => {
    const res = await request(app).get(`/api/tareas/${newTaskId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.idTarea).toBe(newTaskId);
  });

  it("Debe actualizar la tarea", async () => {
    const res = await request(app)
      .put(`/api/tareas/${newTaskId}`)
      .send({ completada: true });

    expect(res.statusCode).toBe(200);
    expect(res.body.completada).toBe(true);
  });

  it("Debe eliminar la tarea", async () => {
    const res = await request(app).delete(`/api/tareas/${newTaskId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Tarea eliminada correctamente");
  });
});
