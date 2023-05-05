const express = require("express");
const orderItems = require("../controllers/orderItems.controller");
const OrderItemsRouter = express.Router();


// OrderItemsRouter.route("/filter/:name").get(orderItems.findByUser);

OrderItemsRouter.route("/")
  .get(orderItems.findAll)
  .post(orderItems.create)
  .delete(orderItems.deleteAll);

OrderItemsRouter.route("/:id")
  .get(orderItems.findOne)
  .put(orderItems.update)
  .delete(orderItems.delete);

module.exports = OrderItemsRouter;
