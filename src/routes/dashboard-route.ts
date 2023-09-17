import { Router } from "express";
import {
  create_dashboard,
  get_dashboard,
} from "../controllers/dashboard-controller";
const router = Router();

import { verifySessionAndAuthorization } from "../middlewares/verify-session";
router.post("/create", create_dashboard);
router.get("/get_dashboard/:dash_id",verifySessionAndAuthorization, get_dashboard);

export default router;
