import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JSON_WEB_TOKEN, {
    expiresIn: "30d",
  });
};

export default generateToken;
