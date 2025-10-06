import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, msg: "No token provided" });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.user = { id: tokenDecode.id }; // safer than req.body
    } else {
      return res.json({ success: false, msg: "Not Authorised, Login Again" });
    }

    next();
  } catch (err) {
    res.json({ success: false, msg: err.message });
  }
};

export default verifyToken;
