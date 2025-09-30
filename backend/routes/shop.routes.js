import { Router } from "express";
import {
  createEditShop,
  getMyShop,
  getShopByCity,
} from "../controllers/shop.controller.js";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
const shopRouter = Router();

shopRouter.post(
  "/create-edit-shop",
  isAuth,
  upload.single("image"),
  createEditShop
);

shopRouter.get("/get-shop", isAuth, getMyShop);
shopRouter.get("/get-shop-by-city/:city", isAuth, getShopByCity);

export default shopRouter;
