const { UNAUTHORIZED_STATUS } = require("./errors");

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED_STATUS;
    this.name = "UnauthorizedError";
  }
}

module.exports = UnauthorizedError;
