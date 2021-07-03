import jwt from "jsonwebtoken";
import config from "../config";

import { TOKEN_ERROR_MESSAGE } from "../constant";

export default (req, res, next) => {
  // Get token from header
  const token = req.header("Bearer");

  // Check if not token
  if (!token) {
    return res.status(403).json({
      status: 403,
      message: TOKEN_ERROR_MESSAGE
    });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    req.body.user = decoded.user;
    next();
  } catch (err) {
    res.status(403).json({ 
      status: 403,
      message: TOKEN_ERROR_MESSAGE
    });
  }
};