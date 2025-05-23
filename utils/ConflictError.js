const { CONFLICT_STATUS } = require("./errors");

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT_STATUS;
    this.name = "ConflictError";
  }
}

module.exports = ConflictError;
