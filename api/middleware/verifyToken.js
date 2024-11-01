const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const bearToken = req.headers["authorization"];
    if (!bearToken) {
      return res.status(400).json("Authorizationヘッダーがありません。");
    }
    const token = bearToken.split(" ")[1];

    if (!token) {
      return res.status(400).json("アクセストークンがありません。");
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decode) => {
      if (err) {
        return res.status(400).json("トークンの検証に失敗しました。");
      } else {
        req.id = decode.id;
        next();
      }
    });
  } catch (error) {
    return res.status(401).json("サーバーエラーが発生しました。");
  }
};

module.exports = verifyToken;
