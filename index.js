require("dotenv").config();
const express = require("express");
const connectDb = require("./db/db");
const router = require("./router/product-route");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
connectDb();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// Route
app.use("/api", router);

app.listen(PORT, () => {
  console.log("Listening at PORT: ", PORT);
});
