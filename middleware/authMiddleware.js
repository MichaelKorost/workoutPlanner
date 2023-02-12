const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// Protect route middleware
const protect = asyncHandler(async (req, res, next) => {
  // Check for token in headers
  const token = req.headers.authorization?.startsWith("Bearer")
    ? req.headers.authorization.split(" ")[1]
    : null;

  if (!token) {
    // Send error if no token found
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);

    // Get user from the token
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Not authorized");
  }
});

module.exports = { protect };
