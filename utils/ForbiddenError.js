const { FORBIDDEN_STATUS } = require("./errors");

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN_STATUS;
    this.name = "ForbiddenError";
  }
}

module.exports = ForbiddenError;
