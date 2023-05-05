const express = require("express");
const categories = require("../controllers/category.controller");
const CategoryRouter = express.Router();

CategoryRouter.route("/")
    .get(categories.findAll)
    .post(categories.create)
    .delete(categories.deleteAll);

CategoryRouter.route("/:id")
    .get(categories.findOne)
    .put(categories.update)
    .delete(categories.delete);

module.exports = CategoryRouter;