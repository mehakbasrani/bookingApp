import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

const hostname = "127.0.0.1";
const port = 8000;

const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mehakbasrani17:Mehak@cluster0.whdmn8s.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("Connected to mongoDB..");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("connected", () => {
  console.log("mongoDB connected!");
});

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
app.use(cors(
  origin: ["https://booking-app-api-l0am.onrender.com/"],
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true
));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(port, hostname, () => {
  connect();
  console.log(`Server running at http://${hostname}:${port}/`);
});
