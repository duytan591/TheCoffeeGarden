
const ProductRouter = require("../routes/product.route");
const PicsUpload = require("../routes/upload.route");
const CategoryRouter = require("../routes/category.route");
const UserRouter = require("../routes/user.route");
const OrderRouter = require("../routes/orders.route");
const OrderItemsRouter = require("../routes/orderItems.route");

let routes =  (app) => {
    app.use("/api/products",ProductRouter);
    app.use("/api/users",UserRouter);
    app.use("/api/products/img",PicsUpload);
    app.use("/api/categories",CategoryRouter);
    app.use("/api/orders",OrderRouter);
    app.use("/api/orderitems",OrderItemsRouter);
}
module.exports = routes;
