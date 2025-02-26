const router = require("express").Router();
const userRouter = require("./users");
const clothingItems = require("./clothingItem");
const { NOT_FOUND } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", clothingItems);
router.use((req, res) => {
  if (err.name === "DocumentNotFoundError") {
    return res.status(NOT_FOUND).send({ message: err.message });
  }
});

module.exports = router;
