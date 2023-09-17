import { Router } from "express";
import {
  create_sub_menu,
  get_all_sub_menus,
  get_sub_menu,
  update_sub_menu,
  delete_sub_menu,
} from "../controllers/sub-menu-controller";
const router = Router();

import { verifySessionAndAuthorization } from "../middlewares/verify-session";

router.post("/create",verifySessionAndAuthorization, create_sub_menu);
router.get("/get_sub-menu/:sm_id",verifySessionAndAuthorization, get_sub_menu);
router.get("/get_all_sub-menus",verifySessionAndAuthorization, get_all_sub_menus);
router.patch("/update/:sm_id",verifySessionAndAuthorization, update_sub_menu);
router.delete("/delete/:sm_id",verifySessionAndAuthorization, delete_sub_menu);

export default router;
