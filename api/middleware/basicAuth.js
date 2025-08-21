// api/middleware/basicAuth.js
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
 * Basic 認証ミドルウェア
 * - 正常時: next()
 * - 未認証: 401 + WWW-Authenticate を返す（ブラウザの認証ダイアログが出る）
 */
module.exports = function basicAuth(req, res, next) {
  // CORS preflight は素通し（必要に応じて）
  if (req.method === "OPTIONS") return next();

  const h = req.headers.authorization || "";
  if (!h.startsWith("Basic ")) {
    res.set(
      "WWW-Authenticate",
      `Basic realm="${process.env.BASIC_AUTH_REALM || "Protected"}"`
    );
    return res.status(401).send("Auth required");
  }
  const [user, pass] = Buffer.from(h.slice(6), "base64")
    .toString("utf8")
    .split(":");
  const ok = pairs.some(([u, p]) => u === user && p === pass);
  if (!ok) {
    res.set(
      "WWW-Authenticate",
      `Basic realm="${process.env.BASIC_AUTH_REALM || "Protected"}"`
    );
    return res.status(401).send("Unauthorized");
  }
  next();
};
