const mongoose = require("mongoose");
require("dotenv").config();

describe("MongoDB Atlas Connection", () => {
  it("debería conectarse exitosamente", async () => {
    await expect(mongoose.connect(process.env.MONGO_URI)).resolves.not.toThrow();
    await mongoose.connection.close();
  });
});
