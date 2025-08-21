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

// DB
mongoose.connect(process.env.MONGO_URL);

// 静的
app.use("/images", express.static(path.join(__dirname, "public/images")));

// CORS（Authorization ヘッダを許可しておくと安心）
app.use(
  cors({
    origin: [process.env.ORIGIN_URL, process.env.ORIGIN_WWW_URL],
    credentials: false,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["authorization", "content-type"],
  })
);
app.use(express.json());

// 除外パス
app.get("/health", (_req, res) => res.send("ok"));

// ここで「除外以外は全部 Basic 認証」
app.use((req, res, next) => {
  const p = req.path || "";
  const excluded = p.startsWith("/health");
  if (excluded) return next();
  return basicAuth(req, res, next);
});

// 以降のルートは認証必須
app.use("/api/admin", adminRoute);
app.use("/api/blog", blogRoute);
app.use("/api/work", workRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/email", emailRoute);
app.use("/api/imageUpload", imageUploadRoute);

module.exports = app;
