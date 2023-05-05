const express = require("express");
const users = require("../controllers/user.controller");
const UserRouter = express.Router();

const passport = require('passport');
const passportConfig = require('../middleware/passport');


// UserRouter.route("/secret").get(passport.authenticate('jwt',{ session: false}), users.secret);
// UserRouter.route("/login").post(passport.authenticate('local',{ session: false}), users.signIn);
UserRouter.route("/secret").get(users.secret);
UserRouter.route("/login").post(users.signIn);
UserRouter.route("/")
    .get(users.findAll)
    .delete(users.deleteAll);

UserRouter.route("/:id")
    .get(users.findOne)
    .put(users.update)
    .delete(users.delete);

UserRouter.route("/register").post(users.signUp);
UserRouter.route("/logout").post(users.logOut);    
module.exports = UserRouter;