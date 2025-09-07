import { Router } from "express";
import { createEditShop, getMyShop } from "../controllers/shop.controller";
import isAuth from "../middlewares/isAuth";
import { upload } from "../middlewares/multer";
const shopRouter = Router();

shopRouter.post(
  "/shop/create-edit-shop",
  isAuth,
  upload.single("image"),
  createEditShop
);

shopRouter.get("/shop/get-shop", isAuth, getMyShop);

export default shopRouter;
