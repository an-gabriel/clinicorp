const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/index");

function generateToken(userId) {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: "1h" });
}

module.exports = {
  generateToken,
};
