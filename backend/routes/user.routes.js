import {Router} from "express"
import  {login,logout,register} from "../controllers/user.controller.js"
const user = Router();

user.post("/login",login)
user.post("/register",register)
user.post("/logout",logout)

export default user;