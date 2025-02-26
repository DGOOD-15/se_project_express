const router = require("express").Router();
const userRouter = require("./users");
const clothingItems = require("./clothingItem");

router.use("/users", userRouter);
router.use("/items", clothingItems);

module.exports = router;
