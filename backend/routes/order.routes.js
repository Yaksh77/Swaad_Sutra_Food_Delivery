import { Router } from "express";
import isAuth from "../middlewares/isAuth.js";
import placeOrder from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.post("/place-order", isAuth, placeOrder);

export default orderRouter;
