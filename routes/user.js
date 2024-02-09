import express from "express";
import {  getMyprofile, login, register ,logout} from "../controllers/user.js";
import { isAuthenticate } from "../middlewares/auth.js";


const router = express.Router();



router.post("/new",register)
router.post("/login",login)
router.get("/logout",logout)

router.get("/me",isAuthenticate, getMyprofile); 


export default router;