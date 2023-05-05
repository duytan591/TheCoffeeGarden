const CategoryService = require("../services/category.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// Create and Save a new Category
exports.create = async (req, res, next) => {
    if (!req.body?.category_title){
        return next(new ApiError(400, "Name can not be empty"));
    }

    try {
        const categoryService = new CategoryService(MongoDB.client);
        const document = await categoryService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next (
            new ApiError(500, "An error occurred while creating category")
        );
    }
};

// Retrieve all products of a user from the database
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const categoryService = new CategoryService(MongoDB.client);
        const {category_title} = req.query;
        if(category_title){
            documents = await categoryService.findByName(category_title);
        } else {
            documents = await categoryService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving categories")
        );
    }

    return res.send(documents);
};

// Delete a Category with the specified id in the request
exports.delete = async (req, res ,next) => {
    try {
        const categoryService = new CategoryService(MongoDB.client);
        const document = await categoryService.delete(req.params.id);
        if(!document){
            return next(new ApiError(404,"Category not found"));
        }
        return res.send({message: "Category was deleted successfully"});
    } catch (error){
        return next(
            new ApiError(500,`Could not delete Category with id=${req.params.id}`)
        );
    }
};

// Delete all Categories from the database
exports.deleteAll = async (_req, res, next) => {
    try {
        const categoryService = new CategoryService(MongoDB.client);
        const deleteCount = await categoryService.deleteAll();
        return res.send({
            message: `${deleteCount} Categories were deleted successfully`
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all Categories")
        );
    }
};

// Find a single category with an id
exports.findOne = async (req, res, next) => {
    try {
        const categoryService = new CategoryService(MongoDB.client);
        const document = await categoryService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404, "Category not found"));
        }
        return res.send(document);
    } catch (error){
        return next (
            new ApiError(
                500, `Error retrieving category with id = ${req.params.id}`
            )
        );
    }
};

// Update a category by the id in the request
exports.update = async (req, res, next) => {
    if(Object.keys(req.body).length===0){
        return next(new ApiError(400, "Data to update con not be empty"));
    }

    try {
        const categoryService = new CategoryService(MongoDB.client);
        const document = await categoryService.update(req.params.id, req.body);
        if(!document){
            return next(new ApiError(404, "Category not found"));
        }
        return res.send({message: "Category was updated successfully"});
    } catch (error){
        return next(
            new ApiError(500,`Error updating category with id=${req.params.id}`)
        );
    }
};