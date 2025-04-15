const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { getCurrentUser, updateCurrentUser } = require("../controllers/users");
const authMiddleware = require("../middlewares/auth");

router.get("/me", authMiddleware, getCurrentUser);

router.patch(
  "/me",
  authMiddleware,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      avatar: Joi.string().uri(),
    }),
  }),
  updateCurrentUser
);

module.exports = router;
