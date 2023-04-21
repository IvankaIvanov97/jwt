const jose = require("jose");
const userService = require("../service/user-service");

module.exports = async function (jwt) {
  const secret = jose.base64url.decode(
    "zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI"
  );
  try {
    const { payload, protectedHeader } = await jose.jwtDecrypt(jwt, secret, {
      issuer: "http://localhost:3000",
      audience: "http://localhost:3000",
    });
    const login = await userService.checkEmail(payload.login);
    if (login) {
      return payload.login;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};
