import express from "express";
import RoleController from "../controllers/RoleController";

import Authorization from "../middleware/Authorization";
import RoleAuth from "../middleware/RoleAuth";

const router = express.Router()

// Public Routes

// With Authentication
router.use(Authorization.Authenticated);
router.get("/role",RoleController.get)
router.get("/role/:id",RoleController.show)
router.post("/role",RoleAuth.admin,RoleController.store)
router.put("/role/:id", RoleAuth.admin,RoleController.update)
router.delete("/role/:id",RoleAuth.superAdmin,RoleController.destroy)

export default router