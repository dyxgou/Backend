import db from "@libs/db";
import http from "http";
import { app } from "./app";

// Connect to mongodb
db();

// Active the API
const server = http.createServer(app);

server.listen(process.env.PORT || 9000);
console.log(
  "✨✨",
  "The server is active on port:",
  `http://localhost:${process.env.PORT || 9000}`
);
