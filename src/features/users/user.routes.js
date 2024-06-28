// package imports
import { Router } from "express";

// module imports
import UserController from "./user.controller.js";

const userController = new UserController();

const router = Router();

router.post("/signup", userController.registerUser);
router.post("/signin", userController.loginUser);
router.get("/signout", userController.logoutUser);

export default router;
