const UserService = require("../services/user.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const bcrypt = require('bcryptjs');
const { response } = require("express");
const {userValidate, loginValidate} = require('../helper/router.help');

const encodeToken = (username) => {
  return JWT.sign(
    {
      iss: "Admin",
      sub: username,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 3),
    },
    JWT_SECRET
  );
};

// Retrieve all users from the database
exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const userService = new UserService(MongoDB.client);
    const { username } = req.query;
    if (username) {
      documents = await userService.findByName(username);
    } else {
      documents = await userService.find({});
    }
  } catch (error) {
    return next(new ApiError(500, "An error occurred while retrieving users"));
  }
  return res.send(documents);
};

// Delete a user with the specified id in the request
exports.delete = async (req, res, next) => {
  try {
    const userService = new UserService(MongoDB.client);
    const document = await userService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "User not found"));
    }
    return res.send({ message: "User was deleted successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Could not delete user with id=${req.params.id}`)
    );
  }
};

// Delete all users from the database
exports.deleteAll = async (_req, res, next) => {
  try {
    const userService = new UserService(MongoDB.client);
    const deleteCount = await userService.deleteAll();
    return res.send({
      message: `${deleteCount} Users were deleted successfully`,
    });
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while removing all users")
    );
  }
};

// Find a single user with an id
exports.findOne = async (req, res, next) => {
  try {
    const userService = new UserService(MongoDB.client);
    const document = await userService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "User not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving user with id = ${req.params.id}`)
    );
  }
};

// Update a user by the id in the request
exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update con not be empty"));
  }

  try {
    const userService = new UserService(MongoDB.client);
    const document = await userService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "User not found"));
    }
    return res.send({ message: "User was updated successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Error updating user with id=${req.params.id}`)
    );
  }
};

// Sign In
exports.signIn = async (req, res, next) => {
    const { username, password } = req.body;
    const {error} = loginValidate(req.body)
    if (error) {
      return res.send(error.details[0].message);
    }
    try {
      const userService = new UserService(MongoDB.client);
      const document = await userService.findByName(username);
      if(document.length === 0){
        return next(new ApiError(400, "User does not exists"))
      }
      const token = encodeToken(document[0].username);
      res.setHeader("Authorization", token);
      res.cookie('jwt',token,{
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000 //set exp 3 day
      });
      
      // const result = await bcrypt.compare(password, document[0].password);
      // if(!result){
      //   return next(new ApiError(400, "Incorrect password"));
      // }
      return res.send(document[0]);
    } catch (error) {
      return next(new ApiError(500, "An error occurred while login"))
    }
};

//Log out
exports.logOut = async (req, res, next) => {
  try {
    res.cookie('jwt','',{maxAge:0});
    res.send({message:'You are Logout'})
  } catch (error) {
    return next(new ApiError(500, "Error!"))
  }
}


// Sign Up
exports.signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  const {error} = userValidate(req.body)
  try {
    if (error) {
      return res.send(error.details[0].message)
    }
    const userService = new UserService(MongoDB.client);
    const checkUsername = await userService.findByName(username);
    const checkEmail = await userService.findByEmail(email);
    if (checkUsername.length === 0) {
      if (checkEmail.length === 0) {
        //hash password
        const salt = await bcrypt.genSalt(10);
        const pwdHashed = await bcrypt.hash(password,salt);
        req.body.password = pwdHashed;
        //create user
        const document = await userService.create(req.body);
        //set token
        const token = encodeToken(document.username);
        res.setHeader("Authorization", token);
        return res.send(document);
      }
      return next(new ApiError(400, "Email is already existed"));
    }
    return next(new ApiError(400, "Username is already existed"));
  } catch (error) {
    return next(new ApiError(500, "An error occurred while creating user"));
  }
};

exports.secret = async (req, res, next) => {
  try {
    const cookie = req.cookies['jwt'];
  const verify = JWT.verify(cookie,JWT_SECRET);
  if(!verify){
    return next(new ApiError(400, "Unauthenticated"));
  }
  const userService = new UserService(MongoDB.client);
  const secret = await userService.findByName(verify.sub)
  res.send(secret[0])
  } catch (error) {
    return next(new ApiError(500, "Error"));
  }
  
};

