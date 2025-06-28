import express from "express";

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

router.put("/:id/decrement", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    const likes = post.likes > 0 ? post.likes - 1 : 0;
    const updatedPost = await post.update({ likes });
    res.send(updatedPost);
  } catch (err) {
    console.error("There was a problem updating the post.", err);
    res.status(500).send("Internal server error");
  }
});

router.put("/:id/add", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    const likes = post.likes + 1;
    const updatedPost = await post.update({ likes });
    res.send(updatedPost);
  } catch (err) {
    console.error("There was a problem updating the post.", err);
    res.status(500).send("Internal server error");
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
