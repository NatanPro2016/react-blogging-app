const express = require("express");
const router = express.Router();
const { Users } = require("../database/mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const editSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  userName: Joi.string().min(3).max(20),
  darkmode: Joi.boolean(),
});
const passwordSchema = Joi.object({
  password: Joi.string().min(6).max(20).required(),
});

const profileSchema = Joi.object({
  img: Joi.string().min(3).required(),
});
const idSchema = Joi.object({
  _id: Joi.string().min(24).max(25),
});
router.get("/", async (req, res) => {
  try {
    const user = await Users.findById(req.session.user._id).select("-password");
    res.json(user);
  } catch (e) {
    res.status(500).send("internal server error ");
  }
});
router.get("/search", async (req, res) => {
  try {
    const userName = req.query.userName || null;
    const page = req.query.page || 0;
    const limit = 2;
    let q = ".*" + userName + ".*";
    try {
      const users = userName
        ? await Users.find({ userName: { $regex: q, $options: "i" } })
            .skip(page * limit)
            .limit(limit)
            .sort({ date: -1 })
            .select("-password")
        : await Users.find()
            .skip(page * limit)
            .limit(limit)
            .sort({ date: -1 })
            .select("-password");

      res.json(users);
    } catch (e) {
      console.log(e);
      res.status(500).send("Internal server error");
    }
  } catch (e) {
    res.status(500).send("internal server error");
  }
});

router.post("/edit", async (req, res) => {
  try {
    const { error } = editSchema.validate(req.body);
    if (error) {
      res.status(400).send(error.message);
    } else {
      const { userName, name, darkmode } = req.body;
      const user = await Users.findById(req.session.user._id);
      if (userName) {
        if (await Users.findOne({ userName })) {
          res.status(400).send(" UserName is alrady taken ");
        } else {
          user.set({
            userName,
          });
        }
      }
      if (name) {
        user.set({
          name,
        });
      }
      if (darkmode != null) {
        user.set({
          darkmode,
        });
      }
      await user.save();
      res.send("Sucessfully edited");
    }
  } catch (e) {
    res.status(500).send("internal server error");
  }
});
router.post("/changePassword", async (req, res) => {
  try {
    const { error } = passwordSchema.validate(req.body);
    if (error) {
      res.status(400).send(error.message);
    } else {
      const { password } = req.body;
      const hashedpassword = await bcrypt.hash(password, 10);
      const user = await Users.findById(req.session.user._id);
      user.set({
        password: hashedpassword,
      });
      await user.save();
      res.send("password changed");
    }
  } catch (e) {
    res.status(500).send("internal server error");
  }
});
router.post("/addProfile", async (req, res) => {
  try {
    const { error } = profileSchema.validate(req.body);
    if (error) {
      res.status(400).send(error.message);
    } else {
      const { img } = req.body;

      const user = await Users.findById(req.session.user._id);
      user.set({
        profile: img,
      });
      await user.save();
      res.send("img added ");
    }
  } catch (e) {
    res.status(500).send("internal server error");
  }
});
router.get("/userName/:userName", async (req, res) => {
  try {
    const userName = req.params.userName;

    if (userName) {
      const user = await Users.findOne({ userName }).select("-password");
      if (user) {
        res.json(user);
      } else {
        res.status(404).send("no user with userName ");
      }
    } else {
      res.status(400).send("insert userName");
    }
  } catch (e) {
    res.status(500).send("internal server error");
  }
});
router.get("/id/:id", async (req, res) => {
  const _id = req.params.id;
  const { error } = idSchema.validate({ _id });
  if (error) {
    res.status(400).send("insert valid  id");
  } else {
    try {
      const user = await Users.findOne({ _id });
      if (user) {
        res.json(user);
      } else {
        res.status(404).send("no user with id ");
      }
    } catch (e) {
      res.status(500).send("something went wrong ");
      console.log(e);
    }
  }
});
module.exports = router;
