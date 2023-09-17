import { Router } from "express";
import {
  create_slider,
  get_all_sliders,
  get_slider,
  update_slider,
  delete_slider,
} from "../controllers/slider-controller";
const router = Router();

import { verifySessionAndAuthorization } from "../middlewares/verify-session";

router.post("/create",verifySessionAndAuthorization, create_slider);
router.get("/get_slider/:s_id",verifySessionAndAuthorization, get_slider);
router.get("/get_all_sliders",verifySessionAndAuthorization, get_all_sliders);
router.patch("/update/:s_id",verifySessionAndAuthorization, update_slider);
router.delete("/delete/:s_id",verifySessionAndAuthorization, delete_slider);

export default router;
