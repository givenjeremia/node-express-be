import express from "express";
import RegisterController from "../controllers/auth/RegisterController";
import LoginController from "../controllers/auth/LoginController";
import TokenController from "../controllers/auth/TokenController";
import UserValidation from "../middleware/validation/UserValidation";
import Authorization from "../middleware/Authorization";

const router = express.Router()

router.post('/register',UserValidation.RegisterValidation,RegisterController.register)
router.post('/login',LoginController.login)
router.post("/logout",Authorization.Authenticated,LoginController.logout)
router.post('/refresh-token',TokenController.RefreshToken)
router.get("/current-user",Authorization.Authenticated,LoginController.currentUser)

export default router
