const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers("Authorization");
    if(!token) {
      res.status(403).json({ error: "Access Denied" });
    }
    if(token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { verifyToken };