const { celebrate, Joi } = require("celebrate");
const router = require("express").Router();
const userRouter = require("./users");
const clothingItems = require("./clothingItem");
const { createUser, login } = require("../controllers/users");
const {
  loginValidation,
  userInfoValidation,
} = require("../middlewares/validation");

router.use("/users", userRouter);
router.use("/items", clothingItems);
router.post("/signin", celebrate(loginValidation), login);
router.post("/signup", celebrate(userInfoValidation), createUser);

const NotFoundError = require("../utils/NotFoundError");

router.use((req, res, next) => {
  next(new NotFoundError("Route not found"));
});
module.exports = router;
