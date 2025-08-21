const pairs = (process.env.BASIC_AUTH_PAIRS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean)
  .map((s) => {
    const i = s.indexOf(":");
    return i > -1 ? [s.slice(0, i), s.slice(i + 1)] : null;
  })
  .filter(Boolean);

/**
 * シンプルなBasic認証
 * 401時はWWW-Authenticateヘッダを返す（ブラウザの認証ダイアログを出す）
 */
module.exports = function basicAuth(req, res, next) {
  const h = req.headers.authorization || "";
  if (!h.startsWith("Basic ")) {
    res.set("WWW-Authenticate", 'Basic realm="Protected"');
    return res.status(401).send("Auth required");
  }
  const [user, pass] = Buffer.from(h.slice(6), "base64")
    .toString("utf8")
    .split(":");
  const ok = pairs.some(([u, p]) => u === user && p === pass);
  if (!ok) {
    res.set("WWW-Authenticate", 'Basic realm="Protected"');
    return res.status(401).send("Unauthorized");
  }
  return next();
};
