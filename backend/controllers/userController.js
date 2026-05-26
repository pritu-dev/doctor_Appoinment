import validator from "validator";
import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";
import DoctorModel from "../models/DoctorModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import AppoinmentModel from "../models/AppoinmentModel.js";
import razorpay from "razorpay";

// API to register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !password || !email) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter valid  email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Enter strong password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashPassword
    };

    const newUser = new UserModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETl);
    console.log("Signed_Token", token);

    res.json({ success: true, token });
  }

  catch (error) {
    res.json({ success: false, message: error.message });
  }
}

//Api for user login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    }
    else {
      res.json({ success: false, message: "Invalid Credentials" })
    }
  }

  catch (error) {
    res.json({ success: false, message: error.message });
  }
}

//Api to get user profile data
export const getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const userData = await UserModel.findById(userId).select("-password");

    res.json({ success: true, userData });
  }
  catch (error) {
    res.json({ success: false, message: error.message });
  }
}

//API to update User profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { phone, name, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" })
    }

    await UserModel.findByIdAndUpdate(userId, { name, phone, dob, gender });

    if (imageFile) {
      // Upload image to cloudinary
      const imageCloudinary = await cloudinary.uploader.upload(
        imageFile.path,
        { resource_type: "image" }
      );

      const imageUrl = imageCloudinary.secure_url;

     let data =  await UserModel.findByIdAndUpdate(userId, { image: imageUrl });
      console.log(data)
    }
    res.json({ success: true, message: "Profile Updated" })
  }
  catch (error) {
    res.json({ success: false, message: error.message });
  }
}

//ApI to book appoinment
export const bookAppoinment = async (req, res) => {
  try {

    const userId = req.userId;
    const { docId, slotDate, slotTime } = req.body;

    const docData = await DoctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available" })
    }

    let slots_booked = docData.slots_booked;

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not available" })
      }
      else {
        slots_booked[slotDate].push(slotTime);
      }
    }
    else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await UserModel.findById(userId).select("-password");

    delete docData.slots_booked;

    const appoinmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now()
    }

    const newAppoinment = new AppoinmentModel(appoinmentData);
    await newAppoinment.save();

    await DoctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appoinment booked" });

  }
  catch (error) {
    res.json({ success: false, message: error.message });
  }
}

//API to get user appoinments for frontend my-appoinments page
export const listAppoinment = async (req, res) => {
  try {
    const userId = req.userId;
    const appoinments = await AppoinmentModel.find({ userId });
    res.json({ success: true, appoinments });
  }

  catch (error) {
    res.json({ success: false, message: error.message });
  }
}

//Api to cancle appoinment
export const cancleAppoinment = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("userId", userId);
    const { appointmentId } = req.body;
    console.log("appointmentId", appointmentId);

    const appoinmentData = await AppoinmentModel.findById(appointmentId);

    // verify appoinment user

    if (appoinmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }

    await AppoinmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    //releasing doctor slot

    const { docId, slotDate, slotTime } = appoinmentData;
    const doctorData = await DoctorModel.findById(docId);
    let slots_booked = doctorData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
    await DoctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment cancelled" });
  }
  catch (error) {
    res.json({ success: false, message: error.message })
  }
}

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

//API to make payment of appointment using razorpay
export const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appoinmentData = await AppoinmentModel.findById(appointmentId);

    if (!appoinmentData || appoinmentData.cancelled) {
      return res.json({ success: false, message: "Appointment cancelled or not found" })
    }

    //creating options for razorpay payment
    const options = {
      amount: appoinmentData.amount * 100,
      currency: process.env.currency,
      receipt: appointmentId,
    }

    // creation of an order
    const order = await razorpayInstance.orders.create(options);
    res.json({ success: true, order })

  }
  catch (error) {
    res.json({ success: false, message: error.message });
  }
}

// API to verify payment of razorpay
export const verifyRazorpay = async (req,res) => {
  try{
    const { razorpay_order_id} = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    console.log(orderInfo);
  }
    catch (error) {
    res.json({ success: false, message: error.message });
  }
}