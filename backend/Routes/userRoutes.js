import express from "express";
import {userLogin, userRegister} from "../Controller/userController.js";

const userRoute = express.Router()

userRoute.post("/auth/signup",userRegister)
userRoute.post("/auth/login",userLogin)


export default userRoute;