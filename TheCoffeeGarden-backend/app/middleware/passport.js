const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const { ExtractJwt } = require("passport-jwt");
const { JWT_SECRET } = require("../config");
const bcrypt = require("bcryptjs");
const UserService = require("../services/user.service");
const mongoDB = require("../utils/mongodb.util");

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
      secretOrKey: JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const userService = new UserService(mongoDB.client);
        const document = await userService.findByName(payload.sub);
        if (!document) {
          return done(null, false);
        }
        done(null, document);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
    },
    async (username, password, done) => {
      try {
        const userService = new UserService(mongoDB.client);
        const document = await userService.findByName(username);
        const result = await bcrypt.compare(password, document[0].password);
        if (!result) return done(null, false);
        done(null, document);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
