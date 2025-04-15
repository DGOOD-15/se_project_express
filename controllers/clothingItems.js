const clothingItem = require("../models/clothingItem");
const BadRequestError = require("../utils/BadRequestError");
const NotFoundError = require("../utils/NotFoundError");
const ForbiddenError = require("../utils/ForbiddenError");

const getItems = (req, res, next) => {
  clothingItem
    .find({})
    .then((items) => {
      res.send(items);
    })
    .catch(next);
};

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  clothingItem
    .create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        throw new BadRequestError("Invalid data passed when creating an item");
      }
      next(err);
    });
};

const deleteItem = (req, res, next) => {
  const userId = req.user._id;
  const { itemId } = req.params;

  clothingItem
    .findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== userId) {
        throw new ForbiddenError("You are not the owner of this item");
      }
      return clothingItem
        .findByIdAndDelete(itemId)
        .then(() => res.json({ message: "Item successfully deleted" }));
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        throw new NotFoundError("Item not found");
      }
      if (err.name === "CastError") {
        throw new BadRequestError("Invalid item ID");
      }
      next(err);
    });
};

const likeItem = (req, res, next) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        throw new BadRequestError("Invalid item ID");
      }
      if (err.name === "DocumentNotFoundError") {
        throw new NotFoundError("Item not found");
      }
      next(err);
    });
};

const dislikeItem = (req, res, next) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        throw new BadRequestError("Invalid item ID");
      }
      if (err.name === "DocumentNotFoundError") {
        throw new NotFoundError("Item not found");
      }
      next(err);
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
