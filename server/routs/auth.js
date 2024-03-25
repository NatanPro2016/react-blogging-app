const express = require("express");
const Joi = require("joi");
const passport = require("passport");
const { Users } = require("../database/mongoose");
const { isLoggedIn } = require("../middleware/isLogIn");
const bcrypt = require("bcrypt");
const router = express.Router();

// valdation

const RegisterSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  userName: Joi.string().min(3).max(20).required(),
  profile: Joi.string().optional(),
  password: Joi.string().min(6).max(1000).required(),
  darkmode: Joi.boolean(),
});

const loginSchema = Joi.object({
  userName: Joi.string().min(3).max(20).required(),
  password: Joi.string().min(6).max(1000),
});
const userName = Joi.object({
  userName: Joi.string().min(3).max(20).required(),
});

const isNotLoggedIn = (req, res, next) => {
  req.session.authenticated ? res.send("You are already loged in") : next();
};

//routs
router.post("/register", isNotLoggedIn, async (req, res) => {
  try {
    const { error } = RegisterSchema.validate(req.body);
    if (error) {
      res.status(400).send(error.message);
    } else {
      const { name, userName, profile, password, darkmode } = req.body;
      if (
        (await Users.findOne({
          userName: userName.toLowerCase(),
        })) == null
      ) {
        try {
          const hashedpassword = await bcrypt.hash(password, 10);

          const newUser = new Users({
            userName: userName.toLowerCase(),
            name,
            profile,
            password: hashedpassword,
            darkmode,
          });
          const user = await newUser.save();
          req.session.authenticated = true;
          req.session.user = {
            name: user.name,
            userName: user.userName,
            _id: user._id,
          };
          res.json(user);
        } catch (e) {
          res.status(500).send("internal Server Error ");
          console.log(e);
        }
      } else {
        res.status(409).send("there is an account with userName");
      }
    }
  } catch (e) {
    res.status(500).send("internal server error");
  }
});

// login route
router.post("/login", isNotLoggedIn, async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (req.session.authenticated) {
      res.status(200).send("sucessfull al login");
    } else {
      if (error) {
        res.status(400).send(error.message);
      } else {
        if (
          (await Users.findOne({
            userName: req.body.userName.toLowerCase(),
          })) == null
        ) {
          res.status(401).send("username  or password is incorrect");
        } else {
          const user = await Users.findOne({
            userName: req.body.userName.toLowerCase(),
          });
          if (await bcrypt.compare(req.body.password, user.password)) {
            req.session.authenticated = true;
            req.session.user = {
              name: user.name,
              userName: user.userName,
              _id: user._id,
            };
            res.send("Sucessfull login .");
          } else {
            res.status(401).send("password is in correct ");
          }
        }
      }
    }
  } catch (e) {
    res.status(500).send("internal server error");
  }
});

router.get("/checkUserName", async (req, res) => {
  try {
    const { error } = userName.validate(req.query);
    if (error) {
      res.status(400).send(error.message);
    } else {
      if (
        (await Users.findOne({
          userName: req.query.userName.toLowerCase(),
        })) == null
      ) {
        res.send("that UserName is avalible");
      } else {
        res.status(400).send("That userName is taken ");
      }
    }
  } catch (e) {
    res.status(500).send("internal server error");
  }
});

router.delete("/logout", (req, res) => {
  try {
    if (req.session.authenticated) {
      req.session.destroy();
      res.send("logged out");
    } else {
      res.send("you are not logged in yet");
    }
  } catch (e) {
    res.status(500).send("internal server error");
  }
});

//google login

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/api/auth/google/success",
    failureRedirect: "/api/auth/google/failure",
  })
);
router.get("/google/success", isLoggedIn, async (req, res) => {
  const _id = await Users.findOne({ id: req.user.id });
  req.session.authenticated = true;
  req.session.user = {
    name: req.user.displayName,
    _id: _id._id,
  };
  res.redirect("http://localhost:5173/");
});
router.get("/google/failure", (req, res) => {
  res.redirect("http://localhost:5173/login");
});

module.exports = router;
