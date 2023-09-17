import { Router } from "express";
import {
  create_menu,
  get_all_menus,
  get_menu,
  update_menu,
  delete_menu,
} from "../controllers/menu-controller";
const router = Router();

import { verifySessionAndAuthorization } from "../middlewares/verify-session";

router.post("/create",verifySessionAndAuthorization, create_menu);
router.get("/get_menu/:m_id",verifySessionAndAuthorization, get_menu);
router.get("/get_all_menus",verifySessionAndAuthorization, get_all_menus);
router.patch("/update/:m_id",verifySessionAndAuthorization, update_menu);
router.delete("/delete/:m_id",verifySessionAndAuthorization, delete_menu);

export default router;
