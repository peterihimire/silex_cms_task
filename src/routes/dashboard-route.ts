import { Router } from "express";
import {
  create_dashboard,
  get_dashboard,
} from "../controllers/dashboard-controller";
const router = Router();

router.post("/create", create_dashboard);
router.get("/get_dashboard/:dash_id", get_dashboard);

export default router;
