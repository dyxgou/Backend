import mongoose from "mongoose";

async function db() {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("✨✨", "Connected to mongodb successfully");
  } catch (err) {
    console.log("⚠️", "Error connecting to mongodb", err);
  }
}

export default db;
