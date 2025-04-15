const { celebrate, Joi } = require("celebrate");
const router = require("express").Router();
const authMiddleware = require("../middlewares/auth");

const validateItemId = {
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24).required(),
  }),
};

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
  celebrate(validateItemId),
  authMiddleware,
  deleteItem
);
router.put(
  "/:itemId/likes",
  celebrate(validateItemId),
  authMiddleware,
  likeItem
);
router.delete(
  "/:itemId/likes",
  celebrate(validateItemId),
  authMiddleware,
  dislikeItem
);

module.exports = router;
