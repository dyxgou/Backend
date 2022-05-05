import PostModel from "@models/PostModel.js";
import { uploadImage, deleteImage } from "@libs/cloudinary.js";
import UserModel from "@models/UserModel.js";
import fs from "fs-extra";

export const createPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    let img;

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      img = {
        url: result.secure_url,
        public_id: result.public_id,
      };
      await fs.remove(req.files.image.tempFilePath);
    }

    const newPost = await new PostModel({
      userId: id,
      description: description,
      image: img,
    });

    newPost.save();

    const postId = newPost._id;

    await UserModel.findByIdAndUpdate(id, {
      $push: {
        post: postId,
      },
    });

    return res.sendStatus(201);
  } catch (err) {
    return res.sendStatus(401).json({
      error: "⚠️ Something went wrong when you try to create the post",
      message: err.message,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postDelete = await PostModel.findByIdAndDelete(req.params.id);

    if (!postDelete) {
      return res.sendStatus(404);
    }

    if (postDelete.image.public_id) {
      await deleteImage(postDelete.image.public_id);
    }

    return res.sendStatus(204);
  } catch (err) {
    console.log(err);
    return res.sendStatus(401).json({
      error: "⚠️ Something went wrong when you try to delete the post",
      message: err.message,
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    await PostModel.updateOne({ _id: req.params.id }, req.body, {
      new: true,
    });
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(401).json({
      error: "⚠️ Something went wrong when you try to Update the post",
      message: err.message,
    });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("userId", {
      nickName: 1,
      avatar: 1,
    });

    res.json(posts);
  } catch (err) {
    console.log(err);
    return res.sendStatus(401).json({
      error: "⚠️ Something went wrong when you try to get the posts",
      message: err.message,
    });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (!post) {
      return res.sendStatus(404);
    }
    return res.send(post);
  } catch (err) {
    console.log(err);
    return res.sendStatus(401).json({
      error: "⚠️ Something went wrong when you try to getPostById the post",
      message: err.message,
    });
  }
};

export const getPostsFriends = async (req, res) => {
  const { id: userId } = req.params;

  const a = await UserModel.findById(userId)
    .populate("friends", {
      post: 1,
    })
    .populate("post", {
      description: 1,
      image: 1,
    });

  return res.json({
    user: a.post,
  });
};
