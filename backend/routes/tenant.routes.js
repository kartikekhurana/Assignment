import express from "express";
import { createTenant, getTenants } from "../controllers/tenant.controllers.js";
import { authenticateJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticateJWT, authorizeRoles("ADMIN"), createTenant);
router.get("/", authenticateJWT, authorizeRoles("ADMIN", "VIEWER"), getTenants);

export default router;
