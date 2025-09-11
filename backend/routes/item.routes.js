import { Router } from "express";
import { addItem, editItem } from "../controllers/item.controller.js";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
const itemRouter = Router();

itemRouter.post("/add-item", isAuth, upload.single("image"), addItem);
itemRouter.post("/edit-item/:itemid", isAuth, upload.single("image"), editItem);

export default itemRouter;
