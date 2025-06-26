import express from "express";
// const {
//   models: { Post },
// } = require("../db/db.js");

import { models } from "../db/index.js";
const { Post } = models;

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.send(await Post.findAll());
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    res.send(await Post.findByPk(req.params.id));
  } catch (err) {
    console.log("There was a problem fetching the post.", err);
  }
});

router.post("/", async (req, res) => {
  try {
    req.body.likes = 0;
    console.log("request body", req.body);
    const post = await Post.create(req.body);
    res.send(post);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    // const post = await Post.findByPk(req.params.id);
    // const updatedPost = await post.update({});
    // res.send(await updatedPost.save());
  } catch (err) {
    console.log("There was a problem updating product.", err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    await post.destroy();
    res.send(post);
  } catch (err) {
    console.log("Could not delete!", err);
  }
});

export default router;
