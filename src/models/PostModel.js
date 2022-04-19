import mongoose from "mongoose";

const PostModel = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "users" },
  description: { type: String, trim: true },
  image: {
    url: String,
    public_id: String,
  },
});

export default mongoose.model("posts", PostModel);
