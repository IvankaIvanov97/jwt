const jose = require("jose");

module.exports = async function (email, type) {
  let time = 50;
  if (type === "access") time = 10;
  const secret = jose.base64url.decode(
    "zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI"
  );
  const jwt = await new jose.EncryptJWT({ email: email })
    .setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
    .setIssuedAt(Date.now())
    .setIssuer("http://localhost:3000")
    .setAudience("http://localhost:3000")
    .setExpirationTime(`${time}s`)
    .encrypt(secret);

  return jwt;
};
