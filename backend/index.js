import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import shopRouter from "./routes/shop.routes.js";
import itemRouter from "./routes/item.routes.js";
import orderRouter from "./routes/order.routes.js";
import { socketHandler } from "./socket.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.set("io", io);

const PORT = process.env.PORT || 3000;

// ✅ Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // allow cookies from frontend
  })
);
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/shop", shopRouter);
app.use("/api/item", itemRouter);
app.use("/api/order", orderRouter);

// ✅ Socket
socketHandler(io);

server.listen(PORT, () => {
  connectDB();
  console.log(`✅ Server running at port ${PORT}`);
});
