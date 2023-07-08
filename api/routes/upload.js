/* eslint-disable no-unused-vars */
const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.resolve(__dirname, "../public/images"));
  },
  filename: (req, file, callback) => {
    callback(null, req.body.name);
  },
});

const upload = multer({
  storage,
  fileFilter(req, file, callback) {
    if (
      ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"].includes(
        file.mimetype,
      )
    ) {
      callback(null, true);
      return;
    }
    callback(new TypeError("無効なファイル形式です"));
  },
});

router.post(
  "/",
  upload.single("file"),
  (req, res, next) => {
    return res.status(200).json("画像アップロードの成功しました！");
  },
  (error, req, res, next) => {
    res.status(500).json(error.message);
  },
);

module.exports = router;
