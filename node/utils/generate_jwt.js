const jose = require("jose");

module.exports = async function (login, type) {
  let time = 10;
  if (type === "access") time = 5;
  const secret = jose.base64url.decode(
    "zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI"
  );
  const jwt = await new jose.EncryptJWT({ login: login })
    .setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
    .setIssuedAt(Date.now())
    .setIssuer("http://localhost:3000")
    .setAudience("http://localhost:3000")
    .setExpirationTime(`${time}s`)
    .encrypt(secret);

  return jwt;
};
