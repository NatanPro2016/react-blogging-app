const express = require("express");
const { Posts } = require("../database/mongoose");
const Joi = require("joi");

const router = express.Router();
const postSchema = Joi.object({
  title: Joi.string().min(3).max(20).required(),
  des: Joi.string().min(3).max(255).required(),
  category: Joi.string().min(3).max(15).required(),
  img: Joi.string().required(),
});

const postEditSchema = Joi.object({
  _id: Joi.string().required(),
  title: Joi.string().min(3).max(40).required(),
  des: Joi.string().min(3).max(255),
  category: Joi.string().required(),
  img: Joi.string().required(),
});
const idSchema = Joi.object({
  _id: Joi.string().min(24).max(25),
});
router.post("/create", async (req, res) => {
  const { error } = postSchema.validate(req.body);
  if (error) {
    res.status(400).send(error.message);
  } else {
    const { img, title, des, category } = req.body;
    const newPost = new Posts({
      img,
      title,
      des,
      category,
      user: req.session.user._id,
    });
    res.send(await newPost.save());
  }
});
router.get("/categories", async (req, res) => {
  const categories = await Posts.find({})
    .select("category -_id")
    .distinct("category");
  res.json(categories);
});
router.post("/edit", async (req, res) => {
  const { error } = postEditSchema.validate(req.body);
  if (error) {
    res.status(400).send(error.message);
  } else {
    const _id = req.body._id;
    const post = await Posts.findById(_id);
    if (post) {
      if (post.user == req.session.user._id) {
        const { title, des, category, img } = req.body;
        await post.set({ title, des, category, img }).save();
        res.send("post Edited");
      } else {
        res.status(400).send("that is not your post to edit ");
      }
    } else {
      res.status(400).send("no post with that id ");
    }
  }
});
router.get("/", async (req, res) => {
  const category = req.query.category || null;
  const page = req.query.page || 0;
  const limit = 2;
  let q = ".*" + category + ".*";
  const post = category
    ? await Posts.find({ category: { $regex: q, $options: "i" } })
        .populate("user")
        .skip(page * limit)
        .limit(limit)
        .sort({ date: -1 })
        .select("-password")
    : await Posts.find()
        .populate("user")
        .skip(page * limit)
        .limit(limit)
        .sort({ date: -1 })
        .select("-password");
  res.json(post);
});
router.get("/id/:post_id", async (req, res) => {
  const _id = req.params.post_id;
  if (_id) {
    const post = await Posts.findOne({ _id })
      .populate("user")
      .select("-password");
    if (post) {
      res.json(post);
    } else {
      res.status(404).send("no post with that id ");
    }
  } else {
    res.status(400).send("insert Id on params");
  }
});
router.get("/user/:user_id", async (req, res) => {
  const user = req.params.user_id;
  const { error } = idSchema.validate({ _id: user });
  if (error) {
    res.status(400).send(error.message);
  } else {
    if (user) {
      const page = req.query.page || 0;
      const limit = 4;

      const posts = await Posts.find({ user })
        .skip(page * limit)
        .limit(limit)
        .sort({ date: -1 });
      if (posts) {
        res.json(posts);
      } else {
        res.status(404).send("no post for that user ");
      }
    } else {
      res.status(400).send("insert Id on params");
    }
  }
});
module.exports = router;
