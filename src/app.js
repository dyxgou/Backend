import express from "express";
import postR from "./routes/post.routes";
import authR from "./routes/auth.routes";
import dotenv from "dotenv";
import fileupload from "express-fileupload";
import cors from "cors";
import avatarR from "./routes/avatar.routes";
import friendR from "./routes/friend.routes";

// void
export const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "./upload",
  })
);

// routes
app.use(postR, authR, avatarR, friendR);
