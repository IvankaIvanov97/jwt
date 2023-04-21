const { auth } = require("../models");
class UserService {
  async getHash(login) {
    const user = await auth.findOne({
      where: {
        login: login,
      },
    });
    return user.hash;
  }
  async setToken(login, refresh) {
    const result = await auth.update(
      {
        refresh: refresh,
      },
      {
        where: {
          login: login,
        },
      }
    );
    return result;
  }
  async checkToken(login, refresh) {
    const result = await auth.findOne({
      where: {
        refresh: refresh,
        login: login,
      },
    });
    return result instanceof auth;
  }
  async createUser(login, hash) {
    const [user, created] = await auth.findOrCreate({
      defaults: {
        login: login,
        hash: hash,
      },
      where: {
        login: login,
      },
    });
    return { user: user, created: created };
  }
  async checkEmail(login) {
    const user = await auth.findOne({
      where: {
        login: login,
      },
    });
    return user instanceof auth;
  }
}

module.exports = new UserService();
