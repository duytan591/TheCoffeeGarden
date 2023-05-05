const ProductService = require("../services/product.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");


// Create and Save a new Product
exports.create = async (req, res, next) => {
    if (!req.body?.title){
        return next(new ApiError(400, "Name can not be empty"));
    }

    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next (
            new ApiError(500, "An error occurred while creating product")
        );
    }
};


// Find a single product with an id
exports.findOne = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404, "Product not found"));
        }
        return res.send(document);
    } catch (error){
        return next (
            new ApiError(
                500, `Error retrieving product with id = ${req.params.id}`
            )
        );
    }
};

// Update a product by the id in the request
exports.update = async (req, res, next) => {
    if(Object.keys(req.body).length===0){
        return next(new ApiError(400, "Data to update con not be empty"));
    }

    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.update(req.params.id, req.body);
        if(!document){
            return next(new ApiError(404, "Product not found"));
        }
        return res.send({message: "Product was updated successfully"});
    } catch (error){
        return next(
            new ApiError(500,`Error updating product with id=${req.params.id}`)
        );
    }
};

// Delete a product with the specified id in the request
exports.delete = async (req, res ,next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.delete(req.params.id);
        if(!document){
            return next(new ApiError(404,"Product not found"));
        }
        return res.send({message: "Product was deleted successfully"});
    } catch (error){
        return next(
            new ApiError(500,`Could not delete product with id=${req.params.id}`)
        );
    }
};

// Find all favorite products of a user
exports.findAllFavorite = async (_req, res,next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const documents = await productService.findFavorite();
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(500,"An error occurred while retrieving favorite products")
        );
    }
};

// Delete all products from the database
exports.deleteAll = async (_req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const deleteCount = await productService.deleteAll();
        return res.send({
            message: `${deleteCount} products were deleted successfully`
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all products")
        );
    }
};


// Retrieve all products
exports.getProductAll = async (req, res, next) => {
    try {
      const productService = new ProductService(MongoDB.client);
      const document = await productService.getData();
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
exports.findByCategory = async(req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.findByCategory(req.params.name);
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