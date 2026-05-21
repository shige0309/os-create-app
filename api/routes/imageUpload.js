const router = require("express").Router();
const multer = require("multer");
const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const { Hash } = require("@aws-sdk/hash-node");
const { HttpRequest } = require("@aws-sdk/protocol-http");
const { buildQueryString } = require("@aws-sdk/querystring-builder");
const { SignatureV4 } = require("@aws-sdk/signature-v4");
require("dotenv").config();

const MAX_IMAGE_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/svg+xml",
];

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials,
});

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: MAX_IMAGE_FILE_SIZE,
  },
  fileFilter(req, file, callback) {
    if (ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
      callback(null, true);
      return;
    }
    callback(new TypeError("無効なファイル形式です"));
  },
});

const uploadSingleImage = upload.single("file");

const encodeS3Key = (key) => key.split("/").map(encodeURIComponent).join("/");

const getPresignedUrl = async ({ key, contentType }) => {
  const hostname = `${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com`;
  const signer = new SignatureV4({
    credentials,
    region: process.env.AWS_REGION,
    service: "s3",
    sha256: Hash.bind(null, "sha256"),
    uriEscapePath: false,
  });

  const request = new HttpRequest({
    protocol: "https:",
    hostname,
    method: "PUT",
    path: `/${encodeS3Key(key)}`,
    headers: {
      host: hostname,
      "content-type": contentType,
    },
  });

  const signedRequest = await signer.presign(request, { expiresIn: 300 });
  const queryString = buildQueryString(signedRequest.query);

  return `${signedRequest.protocol}//${signedRequest.hostname}${signedRequest.path}?${queryString}`;
};

router.post("/presigned", async (req, res) => {
  const { name, folder, contentType, fileSize } = req.body;

  if (!name || !folder || !contentType || !fileSize) {
    return res.status(400).json("アップロード情報が不足しています。");
  }

  if (!ALLOWED_IMAGE_TYPES.includes(contentType)) {
    return res.status(400).json("無効なファイル形式です。");
  }

  if (fileSize > MAX_IMAGE_FILE_SIZE) {
    return res.status(400).json("ファイルサイズは5MB以下にしてください。");
  }

  if (name.includes("/") || name.includes("\\") || name.includes("..")) {
    return res.status(400).json("無効なファイル名です。");
  }

  try {
    const key = folder + name;
    const uploadUrl = await getPresignedUrl({ key, contentType });

    return res.status(200).json({ uploadUrl });
  } catch (error) {
    return res.status(500).json(`署名付きURLの発行に失敗しました。${error}`);
  }
});

router.post("/", (req, res) => {
  uploadSingleImage(req, res, async (uploadError) => {
    if (uploadError) {
      if (uploadError instanceof multer.MulterError) {
        return res.status(400).json(uploadError.message);
      }

      return res.status(400).json(uploadError.message);
    }

    if (!req.file) {
      return res.status(400).send("ファイルがありません。");
    }

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.body.folder + req.body.name,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    try {
      await s3.send(new PutObjectCommand(uploadParams));
      res.status(200).json("ファイルをアップロードしました。");
    } catch (error) {
      res.status(500).json(`画像の登録に失敗しました。${error}`);
    }
  });
});

module.exports = router;
