import { Router } from "express";
import isAuth from "../middlewares/isAuth.js";
import { getMyOrders, placeOrder } from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.post("/place-order", isAuth, placeOrder);
orderRouter.get("/my-orders", isAuth, getMyOrders);

export default orderRouter;
