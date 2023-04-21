const userService = require("../service/user-service");
const passwordHash = require("password-hash");
const generate_jwt = require("../utils/generate_jwt");
var http = require("http");
var Cookies = require("cookies");
const check_jwt = require("../utils/check_jwt");
const { log } = require("console");

class UserController {
  async updateToken(req, res) {
    try {
      const cookies = new Cookies(req, res);
      const refresh = cookies.get("refresh");
      if (refresh) {
        const login = await check_jwt(refresh);
        if (login) {
          const boolRefresh = await userService.checkToken(login, refresh);
          if (boolRefresh) {
            const access = await generate_jwt(login, "access");
            const refresh = await generate_jwt(login, "refresh");
            await userService.setToken(login, refresh);
            cookies.set("refresh", refresh, {
              maxAge: Date.now() + 10,
              httpOnly: true,
            });
            res.send(access);
            return;
          }
        }
      }
      res.status(401).send("Кодовое слово");
    } catch (error) {
      res.status(500).send("Ошибка, authus");
    }
  }
  async chechToken(req, res) {
    try {
      const { auth } = req.headers;
      const boolAccess = await check_jwt(auth);
      boolAccess ? res.send(true) : res.status(401).send("Кодовое слово");
    } catch (error) {
      res.status(500).send("Ошибка, authus");
    }
  }
  async auth(req, res) {
    try {
      const { login, pass } = req.body;
      const hash = await userService.getHash(login);
      if (passwordHash.verify(pass, hash)) {
        const cookies = new Cookies(req, res);
        const access = await generate_jwt(login, "access");
        const refresh = await generate_jwt(login, "refresh");
        await userService.setToken(login, refresh);
        cookies.set("refresh", refresh, {
          maxAge: Date.now() + 50,
          httpOnly: true,
        });
        res.send(access);
      } else {
        res.status(401).send("Кодовое слово");
      }
    } catch (error) {
      res.status(500).send("Ошибка, authus");
    }
  }
  async create(req, res) {
    try {
      const { login, pass, repPass } = req.body;
      if (pass === repPass) {
        const hash = passwordHash.generate(pass);
        const data = await userService.createUser(login, hash);
        data.created
          ? res.send(data.user)
          : res.status(500).send("ЕСТЬ ТАКИЕ!");
      } else {
        res.status(500).send("Пароли не совпадают!");
      }
    } catch (error) {
      res.status(500).send("Ошибка, registratos");
    }
  }
}
module.exports = new UserController();
