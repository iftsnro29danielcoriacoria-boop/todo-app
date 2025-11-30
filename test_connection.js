const mongoose = require("mongoose");
require("dotenv").config();

describe("Conexión a MongoDB Atlas", () => {
  it("debería conectarse correctamente", async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    expect(mongoose.connection.readyState).toBe(1); // 1 = conectado
    await mongoose.disconnect();
  });
});
