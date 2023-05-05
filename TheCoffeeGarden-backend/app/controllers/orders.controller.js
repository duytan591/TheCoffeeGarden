const OrderService = require("../services/orders.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// Create and Save a new Order
exports.create = async (req, res, next) => {
    if (!req.body){
        return next(new ApiError(400, "Data can not be empty"));
    }
    try {
        const orderService = new OrderService(MongoDB.client);
        const newOrder = await orderService.create(req.body);
        return res.send(newOrder);
    } catch (error) {
        return next (
            new ApiError(500, "An error occurred while creating order")
        );
    }
};


// Find a single order with an id
exports.findOne = async (req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404, "Product not found"));
        }
        return res.send(document);
    } catch (error){
        return next (
            new ApiError(
                500, `Error retrieving order with id = ${req.params.id}`
            )
        );
    }
};

// Update a product by the id in the request
exports.update = async (req, res, next) => {
    if(Object.keys(req.body).length===0){
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.update(req.params.id, req.body);
        if(!document){
            return next(new ApiError(404, "Order not found"));
        }
        return res.send({message: "Order was updated successfully"});
    } catch (error){
        return next(
            new ApiError(500,`Error updating order with id=${req.params.id}`)
        );
    }
};

// Delete a product with the specified id in the request
exports.delete = async (req, res ,next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.delete(req.params.id);
        if(!document){
            return next(new ApiError(404,"Order not found"));
        }
        return res.send({message: "Order was deleted successfully"});
    } catch (error){
        return next(
            new ApiError(500,`Could not delete order with id=${req.params.id}`)
        );
    }
};



// Delete all products from the database
exports.deleteAll = async (_req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const deleteCount = await orderService.deleteAll();
        return res.send({
            message: `${deleteCount} orders were deleted successfully`
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all orders")
        );
    }
};


// Retrieve all orders
exports.findAll = async (req, res, next) => {
    try {
      const orderService = new OrderService(MongoDB.client);
      const document = await orderService.retrieveAll();
      if(!document){
        return next(new ApiError(404, "Not Found"));
      }
      return res.send(document);
    } catch(error){
      return next(
        new ApiError(500,'Error')
      );
    }
  }


//Find product with product's category
exports.findByUser = async(req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.findByUser(req.params.username);
        if(!document){
            return next(new ApiError(404, "Not Found"));
          }
          return res.send(document);
        } catch(error){
          return next(
            new ApiError(500,'Error')
        );
    }
}