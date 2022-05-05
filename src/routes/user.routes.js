import { Router } from "express";

const router = Router();

router.get("/myUser");

router.put("/myUser/:id");

router.delete("/myUser");

export default router;
