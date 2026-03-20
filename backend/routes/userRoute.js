import express from "express";
import { registerUser, loginUser, getProfile, updateProfile, bookAppoinment, listAppoinment, cancleAppoinment, paymentRazorpay , verifyRazorpay}  from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";
import upload from "../middleware/multer.js";
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", authUser, getProfile);
userRouter.post("/update-Profile", upload.single("image"), authUser, updateProfile);
userRouter.post("/book-appoinment", authUser, bookAppoinment);
userRouter.get("/appoinments", authUser, listAppoinment);
userRouter.post("/cancle-appointment", authUser, cancleAppoinment);
userRouter.post("/payment-razorpay", authUser, paymentRazorpay);
userRouter.post("/verifyRazorpay", authUser, verifyRazorpay);

export default userRouter;