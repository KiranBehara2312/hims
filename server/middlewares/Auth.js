const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied, no token provided", err: "ADNTP" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Invalid token",
        tokenExpired: err.name === "TokenExpiredError",
        err: "ITP",
      });
    }
    req.loggedInUser = user;
    next();
  });
};

module.exports = isAuthenticated;
