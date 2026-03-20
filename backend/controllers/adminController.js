import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import DoctorModel from "../models/DoctorModel.js";
import UserModel from "../models/UserModel.js"
import AppoinmentModel from "../models/AppoinmentModel.js"


//API for adding doctor
export const addDoctor = async (req, res) => {
  try {

    const { name, email, password, address, speciality, education, experience, about, fees } = req.body;
    const imageFile = req.file;
    console.log(req.file);

    if (!imageFile) {
      return res.json({ success: false, message: "Image is required" });
    }

    if (!name || !email || !password || !speciality || !education || !address|| !experience || !about || !fees ) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Password must be at least 8 characters" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const imageUrl = req.file.path;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      available: true,
      speciality,
      address: parsedAddress,
      education,
      experience,
      about,
      fees,
      date: Date.now()
    };

    const newDoctor = new DoctorModel(doctorData);
    let data = await newDoctor.save();
    console.log(data);

    res.json({ success: true, message: "Doctor Added" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API For admin Login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

      const token = jwt.sign({ email: email }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    }

    else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  }

  catch (err) {
    console.log(err);
  }
}

// API TO GET ALL DOCTORS LIST FOR ADMIN PANEL
export const allDoctors  = async (req,res) => {
  try{
    const doctors  = await DoctorModel.find({}).select("-password");
    res.json({success:true, doctors})


  }
  catch(error) {
     console.log(error);
     res.json({ success: false, message: error.message });
  }
}

//API to get all appoinments list
export const appointmentsAdmin = async (req,res) => {
  try{
    const appoinments = await AppoinmentModel.find({});
    return res.json({success:true, message:" All Appoinments",appoinments})
  }
  catch(error){
    res.json({success:false, message:error.message});
  }
} 

//API to cancle appointment
export const appointmentCancle = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appoinmentData = await AppoinmentModel.findById(appointmentId);
    console.log(appointmentId);
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

//API to get dashboard data for admin pannel
export const adminDashBoard = async (req,res) => {
   try{
      const doctors = await DoctorModel.find({});
      const users = await UserModel.find({});
      const appoinments = await AppoinmentModel.find({});

      const dashData = {
        doctors: doctors.length,
        appointments: appoinments.length,
        patients: users.length,
        latestAppointments: appoinments.reverse().slice(0,5)
      }

      res.json({success:true, dashData});
   }
   catch (error) {
    res.json({ success: false, message: error.message })
  }
}