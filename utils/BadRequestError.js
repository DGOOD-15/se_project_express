const { BAD_REQUEST } = require("./errors");

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST;
    this.name = "BadRequestError";
  }
}

module.exports = BadRequestError;
