const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const bearToken = req.headers["authorization"];
    const token = bearToken.split(" ")[1];

    if (!token) {
      return res.status(400).json("アクセストークンがありません。");
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decode) => {
      if (err) {
        return res.status(400).json(err);
      } else {
        req.id = decode.id;
        next();
      }
    });
  } catch (error) {
    return res.status(401).json(error.message);
  }
};

module.exports = verifyToken;
