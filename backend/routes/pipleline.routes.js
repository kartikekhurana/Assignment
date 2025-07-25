import express from "express";
import { togglePipeline } from "../controllers/pipeline.controller.js";
import { authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

router.put("/:tenantId/toggle", authorizeRoles("ADMIN"), togglePipeline);

export default router;
