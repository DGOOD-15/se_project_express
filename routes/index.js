const { celebrate, Joi } = require("celebrate");
const router = require("express").Router();
const userRouter = require("./users");
const clothingItems = require("./clothingItem");
const { createUser, login } = require("../controllers/users");

const validateAuthentication = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

const validateUser = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().uri(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

router.use("/users", userRouter);
router.use("/items", clothingItems);
router.post("/signin", celebrate(validateAuthentication), login);
router.post("/signup", celebrate(validateUser), createUser);

const NotFoundError = require("../utils/NotFoundError");

router.use((req, res, next) => {
  next(new NotFoundError("Route not found"));
});
module.exports = router;
