import { Router } from "express";
import { addItem, editItem } from "../controllers/item.controller";
import isAuth from "../middlewares/isAuth";
import { upload } from "../middlewares/multer";
const itemRouter = Router();

itemRouter.post("/item/add-item", isAuth, upload.single("image"), addItem);
itemRouter.post(
  "/item/edit-item/:itemid",
  isAuth,
  upload.single("image"),
  editItem
);

export default itemRouter;
