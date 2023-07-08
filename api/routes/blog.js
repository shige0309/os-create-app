const router = require("express").Router();
const Blog = require("../models/Blog");
const verifyToken = require("../middleware/verifyToken");

router.post("/register", async (req, res) => {
  const newBlog = new Blog(req.body);
  try {
    await newBlog.save();
    return res.status(200).json("BLOGを作成しました。");
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/get", async (req, res) => {
  try {
    const blog = await Blog.find();
    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.put("/update/:id", verifyToken, async (req, res) => {
  try {
    const adminId = req.id;
    const blogId = req.params.id;
    const blog = await Blog.findOneAndUpdate(
      { _id: blogId, adminId: adminId },
      {
        $set: req.body,
      }
    );

    if (!blog) {
      return res.status(404).json("ブログは存在しません。");
    }
    return res.status(200).json("ユーザー情報が更新されました。");
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
