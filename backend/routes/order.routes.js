import { Router } from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  acceptOrder,
  getDeliveryBoyAssignment,
  getMyOrders,
  placeOrder,
  updateOrderStatus,
} from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.post("/place-order", isAuth, placeOrder);
orderRouter.get("/my-orders", isAuth, getMyOrders);
orderRouter.post(
  "/update-order-status/:orderId/:shopId",
  isAuth,
  updateOrderStatus
);
orderRouter.get("/get-assignments", isAuth, getDeliveryBoyAssignment);
orderRouter.get("/accept-order/:assignmentId", isAuth, acceptOrder);

export default orderRouter;
