const { celebrate, Joi } = require("celebrate");
const router = require("express").Router();
const authMiddleware = require("../middlewares/auth");
const clothingItemValidation = require("../middlewares/validation");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/", getItems);
router.post("/", authMiddleware, createItem);
router.delete(
  "/:itemId",
  celebrate(clothingItemValidation),
  authMiddleware,
  deleteItem
);
router.put(
  "/:itemId/likes",
  celebrate(clothingItemValidation),
  authMiddleware,
  likeItem
);
router.delete(
  "/:itemId/likes",
  celebrate(clothingItemValidation),
  authMiddleware,
  dislikeItem
);

module.exports = router;
