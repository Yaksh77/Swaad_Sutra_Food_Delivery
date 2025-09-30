import { Router } from "express";
import {
  addItem,
  editItem,
  getItemById,
  deleteItem,
  getItemsByCity,
} from "../controllers/item.controller.js";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
const itemRouter = Router();

itemRouter.post("/add-item", isAuth, upload.single("image"), addItem);
itemRouter.put("/edit-item/:itemId", isAuth, upload.single("image"), editItem);
itemRouter.get("/get-item/:itemId", isAuth, getItemById);
itemRouter.get("/delete-item/:itemId", isAuth, deleteItem);
itemRouter.get("/get-item-by-city/:city", isAuth, getItemsByCity);
export default itemRouter;
