import { Router } from "express";
import {
  create_slider,
  get_all_sliders,
  get_slider,
  update_slider,
  delete_slider,
} from "../controllers/slider-controller";
const router = Router();

router.post("/create", create_slider);
router.get("/get_slider/:s_id", get_slider);
router.get("/get_all_sliders", get_all_sliders);
router.patch("/update/:s_id", update_slider);
router.delete("/delete/:s_id", delete_slider);

export default router;
