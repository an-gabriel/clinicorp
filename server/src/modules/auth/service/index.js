const authCommands = require("../commands/index");

class AuthService {
  async register(name, email, password) {
    return await authCommands.register(name, email, password);
  }

  async login(email, password) {
    return await authCommands.login(email, password);
  }
}

module.exports = new AuthService();
