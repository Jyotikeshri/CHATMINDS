import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connect_db from "./config/ConnectDB.js";
import cookieParser from "cookie-parser";

import routes from "./routes/index.js";
import { app, server } from "./socket/index.js";

dotenv.config();

// const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "https://chatminds.vercel.app"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 3000;

//api endpoints

app.use("/api", routes);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connect_db();
});
