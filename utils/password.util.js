// utils/password.util.js
const crypto = require("crypto");

exports.generatePassword = (length = 10) => {
  return crypto.randomBytes(length)
    .toString("base64")
    .slice(0, length);
};
