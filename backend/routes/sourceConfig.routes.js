import express from "express";
import {
  addSourceConfig,
  getSourceConfig,
} from "../controllers/sourceConfig.Controllers.js";
import { authorizeRoles } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/:tenantId", authorizeRoles("ADMIN"), addSourceConfig);
router.get("/:tenantId", authorizeRoles("ADMIN"), getSourceConfig);

export default router;
