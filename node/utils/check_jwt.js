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
    if (userService.checkEmail(payload.email)) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};
