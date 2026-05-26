import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  try {
    const token = req.headers.atoken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized! Login again",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.json({success: false, message: "Invalid Token"});
    }

    next();

  } catch (error) {
    return res.json({ success: false, message: "Invalid Token" });
  }
};

export default authAdmin;