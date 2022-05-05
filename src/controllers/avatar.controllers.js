import UserModel from "@models/UserModel";
import { uploadImage, deleteImage } from "@libs/cloudinary";
import * as fs from "fs-extra";

export const updateAvatar = async (req, res) => {
  if (!req.files?.image) {
    return res.status(404).send("Image not found");
  }
  try {
    const reqAvatar = await uploadImage(req.files?.image.tempFilePath);
    const avatar = {
      url: reqAvatar.secure_url,
      public_id: reqAvatar.public_id,
    };

    await fs.remove(req.files?.image.tempFilePath);

    await UserModel.findByIdAndUpdate(userId, {
      $set: {
        avatar: avatar,
      },
    });

    return res.status(200).send("Your avatar has been updated");
  } catch (err) {
    console.error({ err });
    return res.status(400).json({
      error: "⚠️ Something went wrong when you try update your avatar",
    });
  }
};
