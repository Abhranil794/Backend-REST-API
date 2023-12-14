import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";

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
const PORT = 3000;
app.use("/", router());
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});

const MONGO_URL =
  "mongodb+srv://abhranil:VXVa42v7vWlel2Ci@cluster0.t27sjxn.mongodb.net/?retryWrites=true&w=majority";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));
