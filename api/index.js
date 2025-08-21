const express = require("express");
const app = express();
const adminRoute = require("./routes/admin");
const blogRoute = require("./routes/blog");
const workRoute = require("./routes/work");
const uploadRoute = require("./routes/upload");
const emailRoute = require("./routes/email");
const imageUploadRoute = require("./routes/imageUpload");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const basicAuth = require("./middleware/basicAuth");

//データベース接続
mongoose.connect(process.env.MONGO_URL);

//ミドルウェア
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(
  cors({
    origin: [process.env.ORIGIN_URL, process.env.ORIGIN_WWW_URL],
    credentials: false,
    methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
  })
);
// --- ここ：除外パスの定義（ヘルスチェックや静的など） ---
const AUTH_EXCLUDE_PREFIXES = ["/health"];
app.get("/health", (_req, res) => res.send("ok"));

// 「除外以外はBasic認証」を一括で適用
app.use((req, res, next) => {
  const p = req.path || "";
  const excluded = AUTH_EXCLUDE_PREFIXES.some((prefix) => p.startsWith(prefix));
  if (excluded) return next();
  return basicAuth(req, res, next);
});
app.use(express.json());
app.use("/api/admin", adminRoute);
app.use("/api/blog", blogRoute);
app.use("/api/work", workRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/email", emailRoute);
app.use("/api/imageUpload", imageUploadRoute);

module.exports = app;
