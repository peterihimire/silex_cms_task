import { Router } from "express";
import {
  create_logo,
  get_all_logos,
  get_logo,
  update_logo,
  delete_logo,
} from "../controllers/logo-controller";
const router = Router();

import { verifySessionAndAuthorization } from "../middlewares/verify-session";

router.post("/create", verifySessionAndAuthorization, create_logo);
router.get("/get_logo/:l_id", verifySessionAndAuthorization, get_logo);
router.get("/get_all_logos", verifySessionAndAuthorization, get_all_logos);
router.patch("/update/:l_id", verifySessionAndAuthorization, update_logo);
router.delete("/delete/:l_id", verifySessionAndAuthorization, delete_logo);

export default router;
