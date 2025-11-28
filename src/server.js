require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3001;

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
