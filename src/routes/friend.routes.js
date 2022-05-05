import {
  acceptRequestFriend,
  sendRequestFriend,
} from "@controllers/friend.controllers";
import { Router } from "express";

const router = Router();

router.post("/sendRequestFriend/:id", sendRequestFriend);

router.post("/acceptRequestFriend/:id", acceptRequestFriend);

export default router;
