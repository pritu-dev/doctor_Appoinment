import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {

    const dToken = req.headers.dtoken;   

    if (!dToken) {
      return res.json({
        success: false,
        message: "Not Authorized! Login again"
      });
    }

    const decoded = jwt.verify(dToken, process.env.JWT_SECRET);

    req.doctorId = decoded.id;  

    next();

  } catch (error) {
    res.json({ success: false, message: "Invalid Token"
    });
  }
};

export default authDoctor;