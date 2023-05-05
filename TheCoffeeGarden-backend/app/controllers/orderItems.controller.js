const OrderItemsService = require("../services/orderItems.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// Create and Save a new order item
exports.create = async (req, res, next) => {
    if (!req.body){
        return next(new ApiError(400, "Data can not be empty"));
    }

    try {
        const orderItemsService = new OrderItemsService(MongoDB.client);
        const document = await orderItemsService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next (
            new ApiError(500, "An error occurred while creating OrderItem")
        );
    }
};

// Retrieve all order items from the database
exports.findAll = async (req, res, next) => {
    try {
      const orderItemsService = new OrderItemsService(MongoDB.client);
      const document = await orderItemsService.retrieveAll();
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

// Delete a order item with the specified id in the request
exports.delete = async (req, res ,next) => {
    try {
        const orderItemsService = new OrderItemsService(MongoDB.client);
        const document = await orderItemsService.delete(req.params.id);
        if(!document){
            return next(new ApiError(404,"OrderItem not found"));
        }
        return res.send({message: "OrderItem was deleted successfully"});
    } catch (error){
        return next(
            new ApiError(500,`Could not delete OrderItem with id=${req.params.id}`)
        );
    }
};

// Delete all order items from the database
exports.deleteAll = async (_req, res, next) => {
    try {
        const orderItemsService = new OrderItemsService(MongoDB.client);
        const deleteCount = await orderItemsService.deleteAll();
        return res.send({
            message: `${deleteCount} OrderItem were deleted successfully`
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all OrderItems")
        );
    }
};

// Find a single order item with an id
exports.findOne = async (req, res, next) => {
    try {
        const orderItemsService = new OrderItemsService(MongoDB.client);
        const document = await orderItemsService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404, "OrderItem not found"));
        }
        return res.send(document);
    } catch (error){
        return next (
            new ApiError(
                500, `Error retrieving orderItem with id = ${req.params.id}`
            )
        );
    }
};

// Update a order item by the id in the request
exports.update = async (req, res, next) => {
    if(Object.keys(req.body).length===0){
        return next(new ApiError(400, "Data to update con not be empty"));
    }

    try {
        const orderItemsService = new OrderItemsService(MongoDB.client);
        const document = await orderItemsService.update(req.params.id, req.body);
        if(!document){
            return next(new ApiError(404, "OrderItem not found"));
        }
        return res.send({message: "OrderItem was updated successfully"});
    } catch (error){
        return next(
            new ApiError(500,`Error updating orderItem with id=${req.params.id}`)
        );
    }
};