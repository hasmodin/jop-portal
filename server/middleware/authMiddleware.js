import jwt from "jsonwebtoken";
import Company from "../models/company.js";

export const protectedCompany = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.json({
      success: false,
      message: "Not authorized, login again!",
    });
  }
  try {
    const decode = jwt.verify(token, process.env.JSON_WEB_TOKEN);
    req.company = await Company.findById(decode.id).select("-password");

    next();
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
