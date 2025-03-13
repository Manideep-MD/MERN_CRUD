import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import route from "./Routes/crudRoutes.js";
import userRoute from "./Routes/userRoutes.js";

var app = express();

app.use(cors());

app.use(bodyParser.json());
dotenv.config();
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/products/", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

app.use("/api/v0", route);
app.use("/api/v0", userRoute);
