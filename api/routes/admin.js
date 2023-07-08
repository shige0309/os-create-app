const router = require("express").Router();
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//admin登録
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const newAdmin = new Admin({
      email: email,
      password: password,
    });

    await newAdmin.save();
    return res.status(200).json("登録しました。");
  } catch (error) {
    return res.status(500).json(error);
  }
});

//ログイン
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email: email });
    if (!admin) return res.status(404).json("ユーザーが見つかりません");

    const validPassword = await admin.verifyPassword(password);
    if (!validPassword) return res.status(400).json("パスワードが違います");

    const token = generateToken(admin._id);

    return res
      .status(200)
      .json({ message: "ログインに成功しました。", token, admin });
  } catch (error) {
    return res.status(500).json(error);
  }
});

//Admin情報の更新
router.put("/update", verifyToken, async (req, res) => {
  try {
    const id = req.id;
    const admin = await Admin.findByIdAndUpdate(
      { _id: id },
      {
        $set: req.body,
      },
    );

    if (!admin) {
      return res.status(404).json("ユーザは存在しません");
    }

    res.status(200).json("ユーザー情報が更新されました。");
  } catch (error) {
    res.status(500).json(error);
  }
});

//Admin情報の取得
router.get("/", verifyToken, async (req, res) => {
  try {
    const id = req.id;
    const admin = await Admin.findById({ _id: id });
    if (!admin) {
      return res.status(404).json("ユーザは存在しません。");
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
