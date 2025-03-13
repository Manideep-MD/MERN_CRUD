import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import route from "./Routes/crudRoutes.js";
import userRoute from "./Routes/userRoutes.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log(`Database connected at ${MONGOURL}`);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`MongoDB connection error: ${error.message}`);
  });

app.get("/products/", (req, res) => {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

app.use("/api/v0", route);
app.use("/api/v0", userRoute);
