import express from "express";
import {SignUp,Login,LogOut,GetUserData} from "../controllers/userController.js";
const router=express.Router();
router.post("/register",SignUp);
router.post("/login",Login);
router.post("/logout",LogOut);
router.get("/getdata",GetUserData);
export default router;