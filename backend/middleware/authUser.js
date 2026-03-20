import jwt from "jsonwebtoken";

//User authentication middleware
const authUser = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized! Login again",
      });
    }
    console.log("token", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("decoded",decoded);
    req.userId = decoded.id;
    console.log("req.userId", req.userId);

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export default authUser;