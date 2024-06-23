const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../../../config/prisma");

class AuthCommands {
  async register(name, email, password) {
    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new Error("Unable to register user");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: { name, email, password: hashedPassword },
      });

      return newUser;
    } catch (error) {
      throw new Error(`Failed to register user: ${error.message}`);
    }
  }

  async login(email, password) {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new Error("Unable to access");
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new Error("Unable to access");
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      return { token, user };
    } catch (error) {
      throw new Error(`Failed to log in: ${error.message}`);
    }
  }
}

module.exports = new AuthCommands();
