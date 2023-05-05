const express = require("express");
const products = require("../controllers/product.controller");
const ProductRouter = express.Router();

ProductRouter.route("/")
  .get(products.getProductAll)
  .post(products.create)
  .delete(products.deleteAll);

ProductRouter.route("/:id")
  .get(products.findOne)
  .put(products.update)
  .delete(products.delete);

ProductRouter.route("/favorite").get(products.findAllFavorite);

ProductRouter.route("/filter/:name").get(products.findByCategory);

module.exports = ProductRouter;
