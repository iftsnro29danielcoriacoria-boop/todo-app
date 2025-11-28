const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("Conexión exitosa a MongoDB Atlas!");
  process.exit();
})
.catch(err => {
  console.error("Error de conexión:", err);
  process.exit(1);
});
