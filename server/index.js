require("dotenv").config();
const express = require("express");
const Connect_Db = require("./database");
const app = express();
const PORT = process.env.PORT || 3000;
const AuthRoutes = require("./routes/Auth");

Connect_Db();

// middlewares
app.use(express.json());

// routes
app.use(AuthRoutes);

app.listen(PORT, () => console.log("Running on server " + PORT));
