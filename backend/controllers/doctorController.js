import DoctorModel from "../models/DoctorModel.js";
import AppoinmentModel from "../models/AppoinmentModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body;

        const docData = await DoctorModel.findById(docId);
        await DoctorModel.findByIdAndUpdate(docId, { available: !docData.available });
        res.json({ success: true, message: "Availablity Changed" })
    }

    catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export const doctorList = async (req, res) => {
    try {
        const doctors = await DoctorModel.find({}).select(["-password", "-email"]);
        res.json({ success: true, doctors });
    }
    catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

//APT to get doctor login
export const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await DoctorModel.findOne({ email });

        if (!doctor) {
            return res.json({ success: false, message: "Invalid Credentials" })
        }
        const isMatch = await bcrypt.compare(password, doctor.password);

        if (isMatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
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

//APT to get doctor appointments for doctor pannel
export const appointmentsData = async (req, res) => {
    try {
        const docId = req.doctorId
        const appointments = await AppoinmentModel.find({ docId });
        res.json({ success: true, appointments });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
}

//API to mark appointment complete for doctor pannel
export const appointmentComplete = async (req, res) => {
    try {

        const { appointmentId } = req.body;
        const docId = req.doctorId;

        const appointmentData = await AppoinmentModel.findById(appointmentId);

        if (appointmentData && appointmentData.docId === docId) {

            await AppoinmentModel.findByIdAndUpdate(
                appointmentId,
                { isCompleted: true }
            );

            return res.json({
                success: true,
                message: "Appointment Completed"
            });

        } else {
            return res.json({
                success: false,
                message: "Mark Failed"
            });
        }

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

//APT cancle appointment to pannel
export const appointmentCancle = async (req, res) => {
    try {

        const { appointmentId } = req.body;
        const docId = req.doctorId;

        const appointmentData = await AppoinmentModel.findById(appointmentId);

        if (appointmentData && appointmentData.docId === docId) {

            await AppoinmentModel.findByIdAndUpdate(
                appointmentId,
                { cancelled: true }
            );

            return res.json({
                success: true,
                message: "Appointment Cancelled"
            });

        } else {
            return res.json({
                success: false,
                message: "Cancellation Failed"
            });
        }

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

//APT to get dashboarrd data for doctor pannel
export const doctorDashBoard = async (req, res) => {
  try {

    const docId = req.doctorId;

    const appointments = await AppoinmentModel.find({ docId });

    let earnings = 0;

    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    let patients = [];

    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0,5)
    };

    res.json({ success: true, dashData });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Apt to get doctor prifile to doctor pannel
export const doctorProfile = async (req,res) => {
    try{
        const docId = req.doctorId;
        const profileData = await DoctorModel.findById(docId).select("-password");
        res.json({success:true, profileData})
    }
    catch (error) {
    res.json({ success: false, message: error.message });
  }
}

//API to update doctor profile data from Doctor Pannel
export const updateDoctorProfile = async (req,res) => {
  try{
     const docId = req.doctorId; 
    const {fees, available} = req.body.profileData;
    await DoctorModel.findByIdAndUpdate(docId, {fees, available});
    res.json({success:true, message: "Profile updated"});
  }
  catch (error) {
    res.json({ success: false, message: error.message });
  }
}
