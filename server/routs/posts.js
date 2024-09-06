const express = require("express");
const { Posts, Users } = require("../database/mongoose");
const Joi = require("joi");

const router = express.Router();
const postSchema = Joi.object({
  title: Joi.string().min(3).max(20).required(),
  des: Joi.string().min(3).max(255).required(),
  category: Joi.string().min(3).max(15).required(),
  img: Joi.string().required(),
  img: Joi.string().required(),
  bluredHash: Joi.string(),
  rename: Joi.string().required(),
});

const postEditSchema = Joi.object({
  _id: Joi.string().required(),
  title: Joi.string().min(3).max(40).required(),
  des: Joi.string().min(3).max(255),
  category: Joi.string().required(),
  img: Joi.string().required(),
  bluredHash: Joi.string(),
  rename: Joi.string().required(),
});
const idSchema = Joi.object({
  _id: Joi.string().min(24).max(25),
});
router.post("/create", async (req, res) => {
  try {
    const { error } = postSchema.validate(req.body);
    if (error) {
      res.status(400).send(error.message);
    } else {
      const { img, rename, title, des, category, bluredHash } = req.body;
      const newPost = new Posts({
        bluredHash,
        img,
        rename,
        title,
        des,
        category,
        user: req.session.user._id,
      });
      res.send(await newPost.save());
    }
  } catch (e) {
    res.status(500).send("internal Server error ");
    console.log(e);
  }
});
router.get("/categories", async (req, res) => {
  try {
    const categories = await Posts.find({})
      .select("category -_id")
      .distinct("category");
    res.json(categories);
  } catch (e) {
    res.status(500).send("internal server error");
  }
});
router.post("/edit", async (req, res) => {
  try {
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
  } catch (e) {
    res.status(500).send("internal server error");
  }
});
router.post("/delete", async (req, res) => {
  try {
    const id = req.body.id;
    if (id) {
      const post = await Posts.findByIdAndDelete({
        _id: id,
        user: req.session.user._id,
      });
      if (!post) {
        res
          .status(400)
          .send("There is no post with id or it is not your post to delete");
      } else {
        res.send("successfully deleted");
      }
    } else {
      res.status(400).send("Post id is required ");
    }
  } catch (e) {
    res.status(500).send("internal server error");
  }
});
router.get("/", async (req, res) => {
  try {
    const category = req.query.category || null;
    const page = req.query.page || 0;
    const limit = 2;
    let q = ".*" + category + ".*";
    const post = category
      ? await Posts.find({ category: { $regex: q, $options: "i" } })
          .populate("user", "-password -saved")
          .skip(page * limit)
          .limit(limit)
          .sort({ date: -1 })
      : await Posts.find()
          .populate("user", "-password -saved")
          .skip(page * limit)
          .limit(limit)
          .sort({ date: -1 });

    res.json(post);
  } catch (e) {
    res.status(500).send("internal server error");
  }
});
router.get("/search", async (req, res) => {
  try {
    const title = req.query.title;
    if (title) {
      const page = req.query.page || 0;
      const limit = 2;
      let q = ".*" + title + ".*";
      try {
        const post = await Posts.find({ title: { $regex: q, $options: "i" } })
          .populate("user", "-password -saved")
          .skip(page * limit)
          .limit(limit)
          .sort({ date: -1 });

        res.json(post);
      } catch (e) {
        console.log(e);
        res.status(500).send("Internal server error");
      }
    } else {
      res.status(400).send("input title");
    }
  } catch (e) {
    res.status(500).send("internal server error");
  }
});
router.get("/id/:post_id", async (req, res) => {
  try {
    const _id = req.params.post_id;
    if (_id) {
      const post = await Posts.findOne({ _id }).populate(
        "user",
        "-password -saved"
      );
      if (post) {
        res.json(post);
      } else {
        res.status(404).send("no post with that id ");
      }
    } else {
      res.status(400).send("insert Id on params");
    }
  } catch (e) {
    res.status(500).send("internal server error");
  }
});
router.get("/user/:user_id", async (req, res) => {
  try {
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
  } catch (e) {
    res.status(500).send("internal server error");
  }
});

router.post("/save", async (req, res) => {
  try {
    const id = req.body.id;
    const user = req.session.user._id;
    const isSaved = await Users.find({ _id: user, saved: { $in: id } });
    if (isSaved == "") {
      await Users.updateOne({ _id: user }, { $push: { saved: id } });
      res.send("saved");
    } else {
      await Users.updateOne({ _id: user }, { $pull: { saved: id } });
      res.json("unsaved");
    }
  } catch (e) {
    res.status(500).send("internal server error");
  }
});

router.get("/saved", async (req, res) => {
  try {
    const title = req.query.title || null;
    let q = ".*" + title + ".*";
    const page = req.query.page || 0;
    const limit = 2;
    const user = await Users.find({ _id: req.session.user._id });

    const post = title
      ? await Posts.find({
          _id: { $in: user[0].saved },
          title: { $regex: q, $options: "i" },
        })
          .populate("user", "-password -saved")
          .skip(page * limit)
          .limit(limit)
          .sort({ date: -1 })
      : await Posts.find({ _id: { $in: user[0].saved } })
          .populate("user", "-password -saved")
          .skip(page * limit)
          .limit(limit)
          .sort({ date: -1 });

    res.json(post);
  } catch (e) {
    res.status(500).send("internal server error ");
  }
});
module.exports = router;
