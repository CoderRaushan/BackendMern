import express from "express";
import {SignUp,Login,LogOut,GetUserData} from "../controllers/userController.js";
const router=express.Router();
import { v2 as cloudinary } from 'cloudinary';
import { AddExpense, EditExpense, ShowExpense } from "../controllers/ExpenseController.js";
cloudinary.config({
    cloud_name:"duthu0r3j",
    api_key:"144852565252598",
    api_secret:"yIcqB0oJitbQW-yG_uV6o2SXtlM" ,
  });
router.post("/register",SignUp);
router.post("/login",Login);
router.post("/logout",LogOut);
router.get("/getdata",GetUserData);
router.post("/AddExpense",AddExpense); 
router.get("/ShowExpense",ShowExpense);
router.put("/EditExpense/:id",EditExpense);
export default router;