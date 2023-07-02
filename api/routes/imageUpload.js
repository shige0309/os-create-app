const router = require("express").Router();
const multer = require("multer");
const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
require("dotenv").config();

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024, //2MB
    },
    fileFilter(req, file, callback) {
        if(["image/png","image/jpeg", "image/jpg", "image/svg+xml"].includes(file.mimetype)) {
            callback(null, true);
            return;
        }
        callback(new TypeError("無効なファイル形式です"));
    }
});

router.post("/", upload.single("file"), async (req, res) => {
    if(!req.file) {
        return res.status(400).send("ファイルがありません。");
    }

    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.body.folder + req.body.name,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
        ACL: "public-read"
    };

    try {
        const data = await s3.send(new PutObjectCommand(uploadParams));
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(`画像の登録に失敗しました。${error}`);
    }
});

module.exports = router;