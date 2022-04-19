import * as jwt from "jsonwebtoken";

const decodeToken = async (req, res) => {
  const token = req.headers.authorization.substring(7);

  try {
    const tokenDecoded = await jwt.verify(token, process.env.JWT_SECRET);

    return tokenDecoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};

export default decodeToken;
