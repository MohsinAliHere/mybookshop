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

app.get("/", (req, res) => {
	res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My Book Shop</title>
        <style>
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
          h1 {
            font-size: 3em;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <h1>My Book Shop</h1>
      </body>
    </html>
  `);
});

app.use(AuthRoutes);

app.listen(PORT, () => console.log("Running on server " + PORT));
