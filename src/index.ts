import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";

require("dotenv").config();

const app = express();
app.use(express.json());

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());

const server = http.createServer(app);
const PORT = 8080;
app.use("/", router());
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});

const MONGO_URL = process.env.MONGO_URL;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));
