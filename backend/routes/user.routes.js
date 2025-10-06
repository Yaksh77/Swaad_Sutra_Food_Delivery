import { Router } from "express";
import {
  getCurrentUser,
  updateUserLocation,
} from "../controllers/user.controller.js";
import isAuth from "../middlewares/isAuth.js";
const userRouter = Router();

userRouter.get("/current-user", isAuth, getCurrentUser);
userRouter.post("/update-user-location", isAuth, updateUserLocation);

export default userRouter;
