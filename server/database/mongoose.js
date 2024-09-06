const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
require("dotenv").config();

mongoose
  .connect("mongodb://127.0.0.1:27017/thesocalvibe")
  .then(() => {
    console.log("connected to mongo db ");
  })
  .catch((e) => {
    console.log("Error connect to database ", e.message);
  });

const Users = mongoose.model(
  "Users",
  new mongoose.Schema({
    userName: { type: String, uniqe: true },
    id: { type: String, uniqe: true },
    name: String,
    profile: String,
    password: String,
    saved: [{ type: ObjectId, ref: "Posts" }],
    date: { type: Date, default: Date.now },
    darkmode: Boolean,
  })
);

const Posts = mongoose.model(
  "Posts",
  new mongoose.Schema({
    title: String,
    des: String,
    img: String,
    rename: String,
    bluredHash: String,
    user: { type: ObjectId, ref: "Users" },
    category: String,
    date: { type: Date, default: Date.now },
  })
);

module.exports = {
  Users,
  Posts,
};
