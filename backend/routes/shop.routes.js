import { Router } from "express";
import { createEditShop } from "../controllers/shop.controller";
import isAuth from "../middlewares/isAuth";
import { upload } from "../middlewares/multer";
const shopRouter = Router();

shopRouter.post(
  "/shop/create-edit-shop",
  isAuth,
  upload.single("image"),
  createEditShop
);

export default shopRouter;
