import express from "express";
import {SignUp,Login,LogOut,GetUserData} from "../controllers/userController.js";
const router=express.Router();
import { upload } from "../controllers/CloudCongi/CloudConfig.js";
router.post("/register",upload.single("photo"),SignUp);
router.post("/login",Login);
router.post("/logout",LogOut);
router.get("/getdata",GetUserData);
export default router;// localhost:8243/user/register