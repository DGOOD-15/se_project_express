const router = require("express").Router();
const authMiddleware = require("../middlewares/auth");
const {
  clothingItemValidation,
  idValidation,
} = require("../middlewares/validation");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/", getItems);
router.post("/", clothingItemValidation, authMiddleware, createItem);
router.delete("/:itemId", idValidation, authMiddleware, deleteItem);
router.put("/:itemId/likes", idValidation, authMiddleware, likeItem);
router.delete(
  "/:itemId/likes",
  clothingItemValidation,
  authMiddleware,
  dislikeItem
);

module.exports = router;
