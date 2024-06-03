const { findUser } = require("../db/userDb");
const { isTokenValid } = require("./jwt");

const isUserAuth = async (token) => {
  const validToken = isTokenValid(token);
  if (!validToken.id) {
    return false;
  }
  const user = await findUser(validToken.id);
  if (!user || user.role === "User") {
    return false;
  }

  return user;
};

module.exports = { isUserAuth };
