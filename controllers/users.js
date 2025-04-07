const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  CONFLICT_STATUS,
  UNAUTHORIZED_STATUS,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const updateCurrentUser = (req, res) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  return User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .select("+password")
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).json({ message: "User not found." });
      }

      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).json({ message: err.message });
      } else {
        next(err);
      }
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  if (!email) {
    return res.status(BAD_REQUEST).send({ message: "Email is required" });
  }

  return User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        const error = new Error("Duplicated");
        error.code = 11000;
        throw error;
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const createdUser = user.toObject();
      delete createdUser.password;
      return res.send(createdUser);
    })

    .catch((err) => {
      console.error(err);
      if (err.code === 11000) {
        return res
          .status(CONFLICT_STATUS)
          .send({ message: "Email already exists." });
      }
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({
          message: err.message,
        });
      } else {
        next(err);
      }
    });
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;
  return User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      } else {
        next(err);
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "Email and password required" });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "Incorrect email or password") {
        return res.status(UNAUTHORIZED_STATUS).send({ message: err.message });
      } else {
        next(err);
      }
    });
};

module.exports = { updateCurrentUser, createUser, getCurrentUser, login };
