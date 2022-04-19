import UserModel from "@models/UserModel.js";
import { hashPassword, comparePassword } from "@utils/password.js";
import * as jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { body: userInfo } = req;
  const { name, nickName, email, password } = userInfo;

  if (!(name, nickName, email, password)) {
    return res.sendStatus(404).json({
      error: "Not Found Information",
    });
  }

  const hashedPassword = await hashPassword(password);
  userInfo.password = hashedPassword;

  try {
    const newUser = await new UserModel(userInfo);

    newUser.save();

    return res.status(201).send("You have been register succesfully");
  } catch (err) {
    return res.sendStatus(500).json({
      error: "⚠️ Something went wrong when you try to register",
      message: err.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne(
    { email },
    {
      password: true,
      name: true,
      nickName: true,
      avatar: true,
      _id: true,
      email: true,
      friends: true,
      post: true,
    }
  );

  const isCorrectPassword = await comparePassword(password, user?.password);

  if (!user || !isCorrectPassword) {
    return res.status(401).send("Invalid email or password");
  }

  const SEVEN_DAYS = 60 * 60 * 24 * 7;

  const token = jwt.sign({ userId: user?._id }, process.env.JWT_SECRET, {
    expiresIn: SEVEN_DAYS,
  });

  return res.status(200).send({
    token,
    user: {
      _id: user?._id,
      avatar: user?.avatar,
      name: user?.name,
      nickName: user?.nickName,
      email: user?.email,
      friends: user?.friends,
      post: user?.post,
    },
  });
};
