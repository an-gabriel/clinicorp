const jwt = require("jsonwebtoken");

class AuthMiddleware {
  verifyToken(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).send("Access Denied");

    try {
      const verified = jwt.verify(token.split(" ")[1], "your_jwt_secret");
      req.user = verified;
      next();
    } catch (error) {
      res.status(400).send("Invalid Token");
    }
  }
}

module.exports = new AuthMiddleware();
