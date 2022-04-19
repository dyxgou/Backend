import { Router } from "express";
import { updateAvatar } from "@controllers/avatar.controllers";

const router = Router();

router.put("/avatar/:id", updateAvatar);

router.delete("/avatar");

export default router;
