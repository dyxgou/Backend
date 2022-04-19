import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: { type: String },
  nickName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: {
    url: String,
    public_id: String,
  },
  friendsRequest: [{ type: mongoose.Types.ObjectId, ref: "users" }],
  friendsPending: [{ type: mongoose.Types.ObjectId, ref: "users" }],
  friends: [{ type: mongoose.Types.ObjectId, ref: "users" }],
  post: [{ type: mongoose.Types.ObjectId, ref: "posts" }],
});

export default mongoose.model("users", UserSchema);
