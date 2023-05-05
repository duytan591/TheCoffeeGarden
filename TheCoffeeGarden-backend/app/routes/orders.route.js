const express = require("express");
const orders = require("../controllers/orders.controller");
const OrderRouter = express.Router();


OrderRouter.route("/filter/:name").get(orders.findByUser);

OrderRouter.route("/")
  .get(orders.findAll)
  .post(orders.create)
  .delete(orders.deleteAll);

OrderRouter.route("/:id")
  .get(orders.findOne)
  .put(orders.update)
  .delete(orders.delete);

module.exports = OrderRouter;
