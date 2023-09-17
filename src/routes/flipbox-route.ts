import { Router } from "express";
import {
  create_flipbox,
  get_all_flipboxes,
  get_flipbox,
  update_flipbox,
  delete_flipbox,
} from "../controllers/flipbox-controller";
const router = Router();

import { verifySessionAndAuthorization } from "../middlewares/verify-session";

router.post("/create", verifySessionAndAuthorization, create_flipbox);
router.get("/get_flipbox/:f_id", verifySessionAndAuthorization, get_flipbox);
router.get(
  "/get_all_flipboxes",
  verifySessionAndAuthorization,
  get_all_flipboxes
);
router.patch("/update/:f_id", verifySessionAndAuthorization, update_flipbox);
router.delete("/delete/:f_id", verifySessionAndAuthorization, delete_flipbox);

export default router;
